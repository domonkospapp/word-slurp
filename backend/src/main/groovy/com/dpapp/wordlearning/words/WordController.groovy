package com.dpapp.wordlearning.words

import com.dpapp.wordlearning.importer.WordImportService
import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.projection.ProjectionFactory
import org.springframework.data.projection.SpelAwareProxyProjectionFactory
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
class WordController {

    private final WordService wordService
    private final WordLanguageService wordLanguageService
    private final WordImportService wordImportService
    private final ProjectionFactory pf

    @Autowired
    WordController(
            WordService wordService,
            WordLanguageService wordLanguageService,
            WordImportService wordImportService
    ) {
        this.wordService = wordService
        this.wordLanguageService = wordLanguageService
        this.wordImportService = wordImportService
        this.pf = new SpelAwareProxyProjectionFactory()
    }

    @PostMapping("/words")
    WordProjection createWord(@RequestBody Word word, CustomUserJwtAuthenticationToken principal) {
        Word savedWord = wordService.createWord(word, principal)
        return pf.createProjection(WordProjection, savedWord)
    }

    @PutMapping("/words/{wordId}")
    WordProjection updateWord(@RequestBody Word word, @PathVariable String wordId, CustomUserJwtAuthenticationToken principal) {
        Word updatedWord = wordService.updateWord(word, wordId, principal)
        return pf.createProjection(WordProjection, updatedWord)
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
