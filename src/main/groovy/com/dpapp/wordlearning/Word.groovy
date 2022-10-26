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
    @Column(name = "foreign_word")
    private String foreign
    private int level

    Word() {

    }

    Word(User user, String original, String foreign, int level) {
        this.user = user
        this.original = original
        this.foreign = foreign
        this.level = level
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
}
