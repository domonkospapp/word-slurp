package com.dpapp.wordlearning

import com.dpapp.wordlearning.security.UserPrincipal
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
    private Set<Word> words

    private String nativeLanguage

    User() {

    }

    User(String email) {
        this.email = email
    }

    User(String email, Set<Word> words) {
        this.email = email
        this.words = words
    }

    @Override
    String getEmail() {
        return email
    }

    void setEmail(String email) {
        this.email = email
    }

    Set<Word> getWords() {
        return words
    }

    void setWords(Set<Word> words) {
        this.words = words
    }

    String getNativeLanguage() {
        return nativeLanguage
    }

    void setNativeLanguage(String nativeLanguage) {
        this.nativeLanguage = nativeLanguage
    }
}
