package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserService
import com.dpapp.wordlearning.words.Word
import com.dpapp.wordlearning.words.WordRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class WordSetService {

    private final WordSetRepository wordSetRepository
    private final UserService userService
    private final WordRepository wordRepository

    @Autowired
    WordSetService(WordSetRepository wordSetRepository, UserService userService, WordRepository wordRepository) {
        this.wordSetRepository = wordSetRepository
        this.userService = userService
        this.wordRepository = wordRepository
    }

    Set<WordSetProjection> getWordSets(String originalLanguage, String foreignLanguage, Boolean isPublic, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        if (isPublic) {
            return wordSetRepository.findAllPublic(user, originalLanguage, foreignLanguage)
        }
        return wordSetRepository.findAllOwn(user, originalLanguage, foreignLanguage)
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

    WordSet getWordSet(Long id, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        WordSet existingWordSet = wordSetRepository.findById(id).orElseThrow(() -> new RuntimeException("Word set not found"))
        if (existingWordSet.getUser() == user || existingWordSet.getIsPublic()) {
            return existingWordSet
        }
        throw new RuntimeException("Can not get other users word sets")
    }

    WordSet getWordSet(Long id) {
        return wordSetRepository.findById(id).orElseThrow(() -> new RuntimeException("Word set not found"))
    }

    WordSet copyWordSet(Long id, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        WordSet existingWordSet = wordSetRepository.findById(id).orElseThrow(() -> new RuntimeException("Word set not found"))
        if (!existingWordSet.getIsPublic())
            throw new RuntimeException("Word set is not public")
        WordSet wordSet = wordSetRepository.save(new WordSet(
                user,
                existingWordSet.name,
                existingWordSet.originalLanguage,
                existingWordSet.foreignLanguage
        ))
        List<Word> words = existingWordSet.words.collect { new Word(wordSet, it.original, it.foreign, 0) }.toList()
        wordSet.setWords(words.toSet())
        wordRepository.saveAll(words)
        return wordSet
    }

}
