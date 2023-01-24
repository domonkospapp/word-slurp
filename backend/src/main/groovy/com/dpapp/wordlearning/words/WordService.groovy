package com.dpapp.wordlearning.words

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserService
import com.dpapp.wordlearning.wordset.WordSet
import com.dpapp.wordlearning.wordset.WordSetService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class WordService {

    private final WordRepository wordRepository
    private final UserService userService
    private final WordSetService wordSetService

    @Autowired
    WordService(WordRepository wordRepository, UserService userService, WordSetService wordSetService) {
        this.wordRepository = wordRepository
        this.userService = userService
        this.wordSetService = wordSetService
    }

    Word createWord(Word word, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        WordSet wordSet = wordSetService.getWordSet(word.getWordSet().getId())
        if (user != wordSet.getUser())
            throw new RuntimeException("Can not add word to other users set")
        word.setWordSet(wordSet)
        word.setLevel(0)
        return wordRepository.save(word)
    }

    Word updateWord(Word word, String wordId, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        Word existingWord = wordRepository.findById(wordId.toLong()).orElseThrow(() -> new RuntimeException("Word not found"))
        if (existingWord.getWordSet().getUser() != user)
            throw new RuntimeException("Can not edit others words")
        if (word.getWordSet() != null) {
            WordSet wordSet = wordSetService.getWordSet(word.getWordSet().getId())
            if (wordSet.getUser() != user)
                throw new RuntimeException("Can not add word to others word set")
            existingWord.setWordSet(wordSet)
        }
        existingWord.setOriginal(word.getOriginal())
        existingWord.setForeign(word.getForeign())
        existingWord.setLevel(word.getLevel())
        return wordRepository.save(existingWord)
    }

    Word getWord( String wordId, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        Word existingWord = wordRepository.findById(wordId.toLong()).orElseThrow(() -> new RuntimeException("Word not found"))
        if (existingWord.getWordSet().getUser() != user)
            throw new RuntimeException("Can not get others words")
        return existingWord
    }


}
