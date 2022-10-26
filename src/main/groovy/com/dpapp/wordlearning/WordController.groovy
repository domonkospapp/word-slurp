package com.dpapp.wordlearning

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

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
        return wordRepository.save(word)
    }

    @GetMapping("/words")
    Set<WordProjection> getWords(@RequestParam String username, @RequestParam String email) {
        User existingUser = userRepository.getByUsernameAndEmail(username, email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        return wordRepository.findAllByUser(existingUser)
    }

}
