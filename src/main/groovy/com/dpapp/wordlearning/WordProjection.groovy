package com.dpapp.wordlearning

interface WordProjection {
    Long getId()

    String getOriginal()

    String getForeign()

    String getOriginalLanguage()

    String getForeignLanguage()

    int getLevel()
}