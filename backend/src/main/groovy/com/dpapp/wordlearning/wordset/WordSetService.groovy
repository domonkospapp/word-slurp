package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class WordSetService {

    private final WordSetRepository wordSetRepository
    private final UserService userService

    @Autowired
    WordSetService(WordSetRepository wordSetRepository, UserService userService) {
        this.wordSetRepository = wordSetRepository
        this.userService = userService
    }

    Set<WordSetProjection> getWordSets(String originalLanguage, String foreignLanguage, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        return wordSetRepository.findAll(user, originalLanguage, foreignLanguage)
    }

    WordSet createWordSet(WordSet wordSet, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        if (wordSetRepository.existsByUserAndName(user, wordSet.getName()))
            throw new RuntimeException("Word set already exists")
        wordSet.setUser(user)
        return wordSetRepository.save(wordSet)
    }

    WordSet updateWordSet(WordSet wordSet, String wordSetId, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        WordSet existingWordSet = wordSetRepository.findById(wordSetId.toLong()).orElseThrow(() -> new RuntimeException("Word set not found"))
        if (existingWordSet.getUser() != user)
            throw new RuntimeException("Can not edit others words")
        existingWordSet.setName(wordSet.getName())
        return wordSetRepository.save(existingWordSet)
    }

    WordSet getWordSet(Long id){
        return wordSetRepository.findById(id).orElseThrow(() -> new RuntimeException("Word set not found"))
    }

}
