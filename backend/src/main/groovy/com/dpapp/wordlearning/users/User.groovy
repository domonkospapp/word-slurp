package com.dpapp.wordlearning.users

import com.dpapp.wordlearning.security.UserPrincipal
import com.dpapp.wordlearning.validator.ISOLanguageValidator
import com.dpapp.wordlearning.wordset.WordSet
import com.fasterxml.jackson.annotation.JsonIgnore

import javax.persistence.*

@Entity
@Table(name = "app_users")
class User implements UserPrincipal {

    @Id
    @GeneratedValue
    private Long id
    private String email

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<WordSet> wordSets

    private String nativeLanguage

    @ElementCollection
    @MapKeyColumn(name="language")
    @Column(name="iso_language", length = 2)
    @CollectionTable(name="user_language_iso_mapping")
    private Map<String, String> languages = new HashMap<String, String>()

    User() {

    }

    Long getId() {
        return id
    }

    User(String email) {
        this.email = email
    }

    User(String email, Set<WordSet> wordSets) {
        this.email = email
        this.wordSets = wordSets
    }

    @Override
    String getEmail() {
        return email
    }

    void setEmail(String email) {
        this.email = email
    }

    Set<WordSet> getWordSets() {
        return wordSets
    }

    void setWordSets(Set<WordSet> wordSets) {
        this.wordSets = wordSets
    }

    String getNativeLanguage() {
        return nativeLanguage
    }

    void setNativeLanguage(String nativeLanguage) {
        ISOLanguageValidator.validateLanguage(nativeLanguage)
        this.nativeLanguage = nativeLanguage
    }

    Map<String, String> getLanguages() {
        return languages
    }

    void addLanguage(String language, String languageIso) {
        ISOLanguageValidator.validateLanguage(languageIso)
        this.languages.put(language, languageIso)
    }
}
