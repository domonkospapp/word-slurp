package com.dpapp.wordlearning

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.words.WordImportService
import com.dpapp.wordlearning.words.WordLanguageService
import com.dpapp.wordlearning.words.WordService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
class WordController {

    private final WordService wordService
    private final WordLanguageService wordLanguageService
    private final WordImportService wordImportService

    @Autowired
    WordController(
            WordService wordService,
            WordLanguageService wordLanguageService,
            WordImportService wordImportService
    ) {
        this.wordService = wordService
        this.wordLanguageService = wordLanguageService
        this.wordImportService = wordImportService
    }

    @PostMapping("/words")
    Word createWord(@RequestBody Word word, CustomUserJwtAuthenticationToken principal) {
        return wordService.createWord(word, principal)
    }

    @GetMapping("/words")
    Set<WordProjection> getWords(
            @RequestParam(required = false) String originalLanguage,
            @RequestParam(required = false) String foreignLanguage,
            CustomUserJwtAuthenticationToken principal
    ) {
        return wordService.getWords(originalLanguage, foreignLanguage, principal)
    }

    @GetMapping("/words/languages")
    Set<WordLanguagesProjection> getLanguagePairs(CustomUserJwtAuthenticationToken principal) {
        return wordLanguageService.getAllLanguagePairs(principal)
    }

    @PutMapping("/words/{wordId}")
    Word updateWord(@RequestBody Word word, @PathVariable String wordId, CustomUserJwtAuthenticationToken principal) {
        return wordService.updateWord(word, wordId, principal)
    }

    @PostMapping("/words/translations")
    List<Word> uploadFile(@RequestParam("translations") MultipartFile translations, CustomUserJwtAuthenticationToken principal) {
        return wordImportService.uploadFileAsFile(translations, principal)
    }

    @PostMapping("/words/import")
    List<Word> uploadFile(@RequestBody CsvTranslations translations, CustomUserJwtAuthenticationToken principal) {
        return wordImportService.uploadFileAsString(translations, principal)
    }

}
