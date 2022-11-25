package com.dpapp.wordlearning

import javax.persistence.*

@Entity
class Word {

    @Id
    @GeneratedValue
    private Long id
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user
    private String original
    private String originalLanguage
    @Column(name = "foreign_word")
    private String foreign
    private String foreignLanguage
    private int level

    Word() {

    }

    Word(User user, String original, String originalLanguage, String foreign, String foreignLanguage, int level) {
        this.user = user
        this.original = original
        this.originalLanguage = originalLanguage
        this.foreign = foreign
        this.foreignLanguage = foreignLanguage
        this.level = level
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

    String getOriginal() {
        return original
    }

    void setOriginal(String original) {
        this.original = original
    }

    String getForeign() {
        return foreign
    }

    void setForeign(String foreign) {
        this.foreign = foreign
    }

    int getLevel() {
        return level
    }

    void setLevel(int level) {
        this.level = level
    }

    String getOriginalLanguage() {
        return originalLanguage
    }

    void setOriginalLanguage(String originalLanguage) {
        this.originalLanguage = originalLanguage
    }

    String getForeignLanguage() {
        return foreignLanguage
    }

    void setForeignLanguage(String foreignLanguage) {
        this.foreignLanguage = foreignLanguage
    }
}
