package com.dpapp.wordlearning.words

interface WordProjection {
    Long getId()

    String getOriginal()

    String getForeign()

    int getLevel()
}