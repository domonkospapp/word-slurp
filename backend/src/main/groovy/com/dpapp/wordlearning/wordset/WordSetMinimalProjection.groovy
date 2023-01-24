package com.dpapp.wordlearning.wordset

interface WordSetMinimalProjection {
    Long getId()

    String getName()

    String getOriginalLanguage()

    String getForeignLanguage()
}