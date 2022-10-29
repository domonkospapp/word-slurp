package com.dpapp.wordlearning

import com.dpapp.wordlearning.importer.CsvImporter
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
    Word createWord(@RequestBody Word word) {
        User currentUser = userRepository.getByUsernameAndEmail(word.getUser().getUsername(), word.getUser().getEmail())
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        if (wordRepository.existsByOriginalAndForeign(word.getOriginal(), word.getForeign()))
            throw new RuntimeException("Word already exists")
        word.setUser(currentUser)
        word.setLevel(0)
        return wordRepository.save(word)
    }

    @GetMapping("/words")
    Set<WordProjection> getWords(@RequestParam String username, @RequestParam String email) {
        User existingUser = userRepository.getByUsernameAndEmail(username, email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        return wordRepository.findAllByUser(existingUser)
    }

    @PutMapping("/words/{wordId}")
    Word updateWord(@RequestBody Word word, @PathVariable String wordId) {
        User existingUser = userRepository.getByUsernameAndEmail(word.getUser().getUsername(), word.getUser().getEmail())
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        Word existingWord = wordRepository.findById(wordId.toLong()).orElseThrow(() -> new RuntimeException("Word not found"))
        if (existingWord.getUser() != existingUser)
            throw new RuntimeException("Can not edit others words")
        existingWord.setOriginal(word.getOriginal())
        existingWord.setForeign(word.getForeign())
        existingWord.setLevel(word.getLevel())
        return wordRepository.save(existingWord)
    }

    @PostMapping("/words/translations")
    List<Word> uploadFile(@RequestParam("translations") MultipartFile translations, @RequestParam String username, @RequestParam String email) {
        User existingUser = userRepository.getByUsernameAndEmail(username, email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        List<Word> words = CsvImporter.loadForUser(translations, existingUser)
        return wordRepository.saveAll(words)
    }

}
