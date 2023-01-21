package com.dpapp.wordlearning.importer

class ImportedWord {

    private final String original

    private final String originalLanguage

    private final String foreign

    private final String foreignLanguage

    ImportedWord(String original, String originalLanguage, String foreign, String foreignLanguage) {
        this.original = original
        this.originalLanguage = originalLanguage
        this.foreign = foreign
        this.foreignLanguage = foreignLanguage
    }

    String getOriginal() {
        return original
    }

    String getOriginalLanguage() {
        return originalLanguage
    }

    String getForeign() {
        return foreign
    }

    String getForeignLanguage() {
        return foreignLanguage
    }
}

