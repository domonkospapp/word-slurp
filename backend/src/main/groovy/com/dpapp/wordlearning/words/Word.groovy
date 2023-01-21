package com.dpapp.wordlearning.words


import com.dpapp.wordlearning.wordset.WordSet

import javax.persistence.*

@Entity
class Word {

    @Id
    @GeneratedValue
    private Long id

    @ManyToOne
    @JoinColumn(name = "word_set_id", nullable = false)
    private WordSet wordSet

    @Column(nullable = false)
    private String original

    @Column(name = "foreign_word", nullable = false)
    private String foreign

    @Column(nullable = false)
    private int level

    Word() {

    }

    Word(WordSet wordSet, String original, String foreign, int level) {
        this.wordSet = wordSet
        this.original = original
        this.foreign = foreign
        this.level = level
    }

    Long getId() {
        return id
    }

    WordSet getWordSet() {
        return wordSet
    }

    void setWordSet(WordSet wordSet) {
        this.wordSet = wordSet
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
