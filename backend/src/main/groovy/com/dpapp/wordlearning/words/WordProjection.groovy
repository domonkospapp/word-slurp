package com.dpapp.wordlearning.words

import com.dpapp.wordlearning.wordset.WordSetMinimalProjection

interface WordProjection {
    Long getId()

    String getOriginal()

    String getForeign()

    WordSetMinimalProjection getWordSet()

    int getLevel()
}