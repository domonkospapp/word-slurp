package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.words.WordLanguagesProjection
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
class WordSetController {

    private final WordSetLanguageService wordSetLanguageService
    private final WordSetService wordSetService

    @Autowired
    WordSetController(
            WordSetLanguageService wordSetLanguageService,
            WordSetService wordSetService
    ) {
        this.wordSetLanguageService = wordSetLanguageService
        this.wordSetService = wordSetService
    }

    @PostMapping("/wordSets")
    WordSet createWord(@RequestBody WordSet wordSet, CustomUserJwtAuthenticationToken principal) {
        return wordSetService.createWordSet(wordSet, principal)
    }

    @GetMapping("/wordSets")
    Set<WordSetProjection> getWords(
            @RequestParam(required = false) String originalLanguage,
            @RequestParam(required = false) String foreignLanguage,
            CustomUserJwtAuthenticationToken principal
    ) {
        return wordSetService.getWordSets(originalLanguage, foreignLanguage, principal)
    }

    @GetMapping("/wordSets/languages")
    Set<WordLanguagesProjection> getLanguagePairs(CustomUserJwtAuthenticationToken principal) {
        return wordSetLanguageService.getAllLanguagePairs(principal)
    }

    @PutMapping("/wordSets/{wordSetId}")
    WordSet updateWord(@RequestBody WordSet wordSet, @PathVariable String wordSetId, CustomUserJwtAuthenticationToken principal) {
        return wordSetService.updateWordSet(wordSet, wordSetId, principal)
    }

}
