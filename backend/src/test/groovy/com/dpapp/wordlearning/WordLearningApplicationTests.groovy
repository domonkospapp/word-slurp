package com.dpapp.wordlearning

import com.dpapp.wordlearning.languages.LanguageController
import com.dpapp.wordlearning.users.UserController
import com.dpapp.wordlearning.words.WordController
import com.dpapp.wordlearning.wordset.WordSetController
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.security.oauth2.jwt.JwtDecoder
import spock.lang.Specification

@SpringBootTest
class WordLearningApplicationTests extends Specification {

    @MockBean
    private JwtDecoder jwtDecoder

    @Autowired
    private UserController userController

    @Autowired
    private WordController wordController

    @Autowired
    private WordSetController wordSetController

    @Autowired
    private LanguageController languageController

    def "when context is loaded then all expected beans are created"() {
        expect: "the WebController is created"
            userController
            wordController
            wordSetController
            languageController
    }

}
