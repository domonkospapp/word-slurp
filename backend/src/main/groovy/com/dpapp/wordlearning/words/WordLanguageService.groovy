package com.dpapp.wordlearning.words

import com.dpapp.wordlearning.User
import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.projection.ProjectionFactory
import org.springframework.data.projection.SpelAwareProxyProjectionFactory
import org.springframework.stereotype.Service

@Service
class WordLanguageService {

    private final WordRepository wordRepository
    private final UserService userService
    private final ProjectionFactory pf


    @Autowired
    WordLanguageService(WordRepository wordRepository, UserService userService) {
        this.wordRepository = wordRepository
        this.userService = userService
        this.pf = new SpelAwareProxyProjectionFactory()
    }

    Set<WordLanguagesProjection> getAllLanguagePairs(CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        return wordRepository.findAllLanguages(user.getId()).collect {
            pf.createProjection(WordLanguagesProjection, it)
        }
    }

}
