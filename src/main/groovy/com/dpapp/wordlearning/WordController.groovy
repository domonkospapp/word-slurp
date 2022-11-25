package com.dpapp.wordlearning

import com.dpapp.wordlearning.importer.CsvImporter
import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
class WordController {

    private final UserRepository userRepository
    private final WordRepository wordRepository

    @Autowired
    WordController(UserRepository userRepository, WordRepository wordRepository) {
        this.userRepository = userRepository
        this.wordRepository = wordRepository
    }

    @PostMapping("/words")
    Word createWord(@RequestBody Word word, CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        User currentUser = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        if (wordRepository.existsByOriginalAndForeign(word.getOriginal(), word.getForeign()))
            throw new RuntimeException("Word already exists")
        word.setUser(currentUser)
        word.setLevel(0)
        return wordRepository.save(word)
    }

    @GetMapping("/words")
    Set<WordProjection> getWords(CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        User existingUser = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        return wordRepository.findAllByUser(existingUser)
    }

    @PutMapping("/words/{wordId}")
    Word updateWord(@RequestBody Word word, @PathVariable String wordId, CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        User existingUser = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        Word existingWord = wordRepository.findById(wordId.toLong()).orElseThrow(() -> new RuntimeException("Word not found"))
        if (existingWord.getUser() != existingUser)
            throw new RuntimeException("Can not edit others words")
        existingWord.setOriginal(word.getOriginal())
        existingWord.setOriginalLanguage(word.getOriginalLanguage())
        existingWord.setForeign(word.getForeign())
        existingWord.setForeignLanguage(word.getForeignLanguage())
        existingWord.setLevel(word.getLevel())
        return wordRepository.save(existingWord)
    }

    @PostMapping("/words/translations")
    List<Word> uploadFile(@RequestParam("translations") MultipartFile translations, CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        User existingUser = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        List<Word> words = CsvImporter.loadForUser(translations, existingUser)
        return wordRepository.saveAll(words)
    }

    @PostMapping("/words/import")
    List<Word> uploadFile(@RequestBody CsvTranslations translations, CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        User existingUser = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        List<Word> words = CsvImporter.loadForUser(translations.getContent(), existingUser)
        return wordRepository.saveAll(words)
    }

}
