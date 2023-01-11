package com.dpapp.wordlearning.words

interface WordProjection {
    Long getId()

    String getOriginal()

    String getForeign()

    String getOriginalLanguage()

    String getForeignLanguage()

    int getLevel()
}