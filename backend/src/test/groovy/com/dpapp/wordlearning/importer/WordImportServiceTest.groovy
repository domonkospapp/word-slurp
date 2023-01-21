package com.dpapp.wordlearning.importer

import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserService
import com.dpapp.wordlearning.words.WordRepository
import com.dpapp.wordlearning.wordset.WordSetRepository
import spock.lang.Specification

class WordImportServiceTest extends Specification {

    WordImportService importer

    void setup() {
        def wordRepository = Mock(WordRepository.class)
        def wordSetRepository = Mock(WordSetRepository.class)
        def userService = Mock(UserService.class)
        importer = new WordImportService(wordRepository, wordSetRepository, userService)
    }


    def "generateWordSets"() {
        given:
            def importedWords = [
                    new ImportedWord("a", "en", "b", "de"),
                    new ImportedWord("c", "de", "d", "es"),
                    new ImportedWord("e", "en", "f", "de"),
                    new ImportedWord("g", "de", "h", "es"),
                    new ImportedWord("i", "hu", "j", "es")
            ]

            def importId = "123"
            def user = new User("email")

        when:
            def languages = importer.generateWordSets(importedWords, user, importId)

        then:
            languages.size() == 3

            languages.get("en-de-123").name == "en-de-123"
            languages.get("en-de-123").originalLanguage == "en"
            languages.get("en-de-123").foreignLanguage == "de"
            languages.get("en-de-123").user.email == "email"
            languages.get("en-de-123").words.size() == 0
            !languages.get("en-de-123").isPublic

            languages.get("de-es-123").name == "de-es-123"
            languages.get("de-es-123").originalLanguage == "de"
            languages.get("de-es-123").foreignLanguage == "es"
            languages.get("de-es-123").user.email == "email"
            languages.get("de-es-123").words.size() == 0
            !languages.get("de-es-123").isPublic

            languages.get("hu-es-123").name == "hu-es-123"
            languages.get("hu-es-123").originalLanguage == "hu"
            languages.get("hu-es-123").foreignLanguage == "es"
            languages.get("hu-es-123").user.email == "email"
            languages.get("hu-es-123").words.size() == 0
            !languages.get("hu-es-123").isPublic
    }


    def "removeLanguageDuplications"() {
        given:
            def importedWords = [
                    new ImportedWord("a", "en", "b", "de"),
                    new ImportedWord("c", "de", "d", "es"),
                    new ImportedWord("e", "en", "f", "de"),
                    new ImportedWord("g", "de", "h", "es"),
                    new ImportedWord("i", "hu", "j", "es")
            ]

        when:
            def languages = importer.removeLanguageDuplications(importedWords)

        then:
            languages.size() == 3
            languages.containsKey("en-de")
            languages.containsKey("de-es")
            languages.containsKey("hu-es")
    }

    def "generateWordSetKey"() {
        given:
            def importedWord = new ImportedWord("run", "en", "laufen", "de")

        expect:
            importer.generateWordSetKey(importedWord, "123") == "en-de-123"
    }


}
