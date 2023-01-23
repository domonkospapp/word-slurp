package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.words.WordProjection

interface WordSetProjection {
    Long getId()

    String getName()

    String getOriginalLanguage()

    String getForeignLanguage()

    Set<WordProjection> getWords()

    boolean getIsPublic()
}