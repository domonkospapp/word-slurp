package com.dpapp.wordlearning.validator

class ISOLanguageValidator {
    static void validateLanguage(String lang){
        if(!Locale.getISOLanguages().contains(lang)){
            throw new RuntimeException("Language not supported: ${lang}")
        }
    }
}
