package com.dpapp.wordlearning

import com.dpapp.wordlearning.validator.ISOLanguageValidator

import javax.persistence.*

@Entity
class Word {

    @Id
    @GeneratedValue
    private Long id

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user

    @Column(nullable = false)
    private String original

    @Column(nullable = false)
    private String originalLanguage

    @Column(name = "foreign_word", nullable = false)
    private String foreign

    @Column(nullable = false)
    private String foreignLanguage

    @Column(nullable = false)
    private int level

    Word() {

    }

    Word(User user, String original, String originalLanguage, String foreign, String foreignLanguage, int level) {
        ISOLanguageValidator.validateLanguage(originalLanguage)
        ISOLanguageValidator.validateLanguage(foreignLanguage)
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
}
