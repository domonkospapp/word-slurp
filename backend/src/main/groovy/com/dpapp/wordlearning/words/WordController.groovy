package com.dpapp.wordlearning.words

import com.dpapp.wordlearning.importer.WordImportService
import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
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

    @PostMapping("wordSets/{wordSetId}/words")
    Word createWord(@RequestBody Word word, @PathVariable Long wordSetId, CustomUserJwtAuthenticationToken principal) {
        return wordService.createWord(word, wordSetId, principal)
    }

    @PutMapping("/wordSets/{wordSetId}/words/{wordId}")
    Word updateWord(@RequestBody Word word, @PathVariable String wordSetId, @PathVariable String wordId, CustomUserJwtAuthenticationToken principal) {
        return wordService.updateWord(word, wordSetId, wordId, principal)
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
