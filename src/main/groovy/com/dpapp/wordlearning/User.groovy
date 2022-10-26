package com.dpapp.wordlearning

import com.fasterxml.jackson.annotation.JsonIgnore

import javax.persistence.*

@Entity
@Table(name = "app_users")
class User {

    @Id
    @GeneratedValue
    private Long id
    private String username
    private String email

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Word> words

    User() {

    }

    User(String username, String email, Set<Word> words) {
        this.username = username
        this.email = email
        this.words = words
    }

    String getUsername() {
        return username
    }

    void setUsername(String username) {
        this.username = username
    }

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
}
