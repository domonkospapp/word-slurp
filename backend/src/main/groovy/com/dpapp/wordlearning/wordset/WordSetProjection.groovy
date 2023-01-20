package com.dpapp.wordlearning.wordset

interface WordSetProjection {
    Long getId()

    String getName()

    String getOriginalLanguage()

    String getForeignLanguage()

    boolean getIsPublic()
}