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

//    Set<WordProjection> getWords(String originalLanguage, String foreignLanguage, CustomUserJwtAuthenticationToken principal) {
//        User user = userService.getUser(principal)
//        return wordRepository.findAll(user, originalLanguage, foreignLanguage)
//    }

    Word createWord(Word word, Long wordSetId, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        WordSet wordSet = wordSetService.getWordSet(wordSetId)
        if (user != wordSet.getUser())
            throw new RuntimeException("Can not add word to other users set")
        word.setWordSet(wordSet)
        word.setLevel(0)
        return wordRepository.save(word)
    }

    Word updateWord(Word word, String wordSetId, String wordId, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        Word existingWord = wordRepository.findById(wordId.toLong()).orElseThrow(() -> new RuntimeException("Word not found"))
        if (existingWord.getWordSet().getId() != wordSetId.toLong())
            throw new RuntimeException("Word is not in the set")
        if (existingWord.getWordSet().getUser() != user)
            throw new RuntimeException("Can not edit others words")
        existingWord.setOriginal(word.getOriginal())
        existingWord.setForeign(word.getForeign())
        existingWord.setLevel(word.getLevel())
        return wordRepository.save(existingWord)
    }


}
