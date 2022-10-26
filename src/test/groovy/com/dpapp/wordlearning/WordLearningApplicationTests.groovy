package com.dpapp.wordlearning

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest
class WordLearningApplicationTests extends Specification {

    @Autowired
    private UserController userController
    @Autowired
    private WordController wordController

    def "when context is loaded then all expected beans are created"() {
        expect: "the WebController is created"
        userController
        wordController
    }

}
