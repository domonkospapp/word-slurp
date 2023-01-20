package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserService
import com.dpapp.wordlearning.words.WordLanguagesProjection
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.projection.ProjectionFactory
import org.springframework.data.projection.SpelAwareProxyProjectionFactory
import org.springframework.stereotype.Service

@Service
class WordSetLanguageService {

    private final WordSetRepository wordSetRepository
    private final UserService userService
    private final ProjectionFactory pf


    @Autowired
    WordSetLanguageService(WordSetRepository wordSetRepository, UserService userService) {
        this.wordSetRepository = wordSetRepository
        this.userService = userService
        this.pf = new SpelAwareProxyProjectionFactory()
    }

    Set<WordLanguagesProjection> getAllLanguagePairs(CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        return wordSetRepository.findAllLanguages(user.getId()).collect {
            pf.createProjection(WordLanguagesProjection, it)
        }
    }

}
