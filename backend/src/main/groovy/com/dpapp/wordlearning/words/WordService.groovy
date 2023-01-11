package com.dpapp.wordlearning.words

import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class WordService {

    private final WordRepository wordRepository
    private final UserService userService

    @Autowired
    WordService(WordRepository wordRepository, UserService userService) {
        this.wordRepository = wordRepository
        this.userService = userService
    }

    Set<WordProjection> getWords(String originalLanguage, String foreignLanguage, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        return wordRepository.findAll(user, originalLanguage, foreignLanguage)
    }

    Word createWord(Word word, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        if (wordRepository.existsByOriginalAndForeign(word.getOriginal(), word.getForeign()))
            throw new RuntimeException("Word already exists")
        word.setUser(user)
        word.setLevel(0)
        return wordRepository.save(word)
    }

    Word updateWord(Word word, String wordId, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        Word existingWord = wordRepository.findById(wordId.toLong()).orElseThrow(() -> new RuntimeException("Word not found"))
        if (existingWord.getUser() != user)
            throw new RuntimeException("Can not edit others words")
        existingWord.setOriginal(word.getOriginal())
        existingWord.setOriginalLanguage(word.getOriginalLanguage())
        existingWord.setForeign(word.getForeign())
        existingWord.setForeignLanguage(word.getForeignLanguage())
        existingWord.setLevel(word.getLevel())
        return wordRepository.save(existingWord)
    }


}
