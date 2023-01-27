package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.words.WordLanguagesProjection
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.projection.ProjectionFactory
import org.springframework.data.projection.SpelAwareProxyProjectionFactory
import org.springframework.web.bind.annotation.*

@RestController
class WordSetController {

    private final WordSetLanguageService wordSetLanguageService
    private final WordSetService wordSetService
    private final ProjectionFactory pf

    @Autowired
    WordSetController(
            WordSetLanguageService wordSetLanguageService,
            WordSetService wordSetService
    ) {
        this.wordSetLanguageService = wordSetLanguageService
        this.wordSetService = wordSetService
        this.pf = new SpelAwareProxyProjectionFactory()
    }

    @PostMapping("/wordSets")
    WordSet createWordSet(@RequestBody WordSet wordSet, CustomUserJwtAuthenticationToken principal) {
        return wordSetService.createWordSet(wordSet, principal)
    }

    @GetMapping("/wordSets")
    Set<WordSetProjection> getWordSets(
            @RequestParam(required = false) String originalLanguage,
            @RequestParam(required = false) String foreignLanguage,
            @RequestParam(required = false) Boolean isPublic,
            CustomUserJwtAuthenticationToken principal
    ) {
        return wordSetService.getWordSets(originalLanguage, foreignLanguage, isPublic, principal)
    }

    @GetMapping("/wordSets/{wordSetId}")
    WordSetProjection getWordSet(@PathVariable Long wordSetId, CustomUserJwtAuthenticationToken principal) {
        return pf.createProjection(WordSetProjection, wordSetService.getWordSet(wordSetId, principal))

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
