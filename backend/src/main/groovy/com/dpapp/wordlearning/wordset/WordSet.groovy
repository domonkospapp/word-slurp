package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.validator.ISOLanguageValidator
import com.dpapp.wordlearning.words.Word
import com.fasterxml.jackson.annotation.JsonIgnore

import javax.persistence.*

@Entity
class WordSet {

    @Id
    @GeneratedValue
    private Long id

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user

    @Column(nullable = false)
    private String name

    @Column
    private String originalLanguage

    @Column
    private String foreignLanguage

    @OneToMany(mappedBy = "wordSet")
    private Set<Word> words = []

    @Column
    private boolean isPublic = false

    WordSet() {

    }

    WordSet(User user, String name) {
        this.user = user
        this.name = name
    }

    WordSet(User user, String name, String originalLanguage, String foreignLanguage) {
        ISOLanguageValidator.validateLanguage(originalLanguage)
        ISOLanguageValidator.validateLanguage(foreignLanguage)
        this.user = user
        this.name = name
        this.originalLanguage = originalLanguage
        this.foreignLanguage = foreignLanguage
    }

    void addWord(Word word){
        words.add(word)
    }

    Long getId() {
        return id
    }

    User getUser() {
        return user
    }

    void setUser(User user) {
        this.user = user
    }

    String getName() {
        return name
    }

    void setName(String name) {
        this.name = name
    }

    String getOriginalLanguage() {
        return originalLanguage
    }

    void setOriginalLanguage(String originalLanguage) {
        ISOLanguageValidator.validateLanguage(originalLanguage)
        this.originalLanguage = originalLanguage
    }

    String getForeignLanguage() {
        return foreignLanguage
    }

    void setForeignLanguage(String foreignLanguage) {
        ISOLanguageValidator.validateLanguage(foreignLanguage)
        this.foreignLanguage = foreignLanguage
    }

    Set<Word> getWords() {
        return words
    }

    void setWords(Set<Word> words) {
        this.words = words
    }

    boolean getIsPublic() {
        return isPublic
    }

    void setIsPublic(boolean isPublic) {
        this.isPublic = isPublic
    }

}
