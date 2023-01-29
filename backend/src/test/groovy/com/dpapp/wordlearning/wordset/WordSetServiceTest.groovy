package com.dpapp.wordlearning.wordset


import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserService
import com.dpapp.wordlearning.words.Word
import com.dpapp.wordlearning.words.WordRepository
import spock.lang.Specification

class WordSetServiceTest extends Specification {

    CustomUserJwtAuthenticationToken principal = Mock(CustomUserJwtAuthenticationToken)
    UserService userService = Mock(UserService)
    WordSetRepository wordSetRepository = Mock(WordSetRepository)
    WordRepository wordRepository = Mock(WordRepository)
    WordSetService classUnderTest = new WordSetService(wordSetRepository, userService, wordRepository)

    def "copyWordSet should copy word set and set level to 0"() {
        given:
            WordSet wordSet = new WordSet(new User("other@user.com"), "S1", "en", "fr", true)
            wordSet.addWord(new Word(wordSet, "word1", "translation1", 1))
            wordSet.addWord(new Word(wordSet, "word2", "translation2", 2))

            userService.getUser(principal) >> new User("user@user.com")
            wordSetRepository.findById(wordSet.id) >> Optional.of(wordSet)
            wordSetRepository.save(_ as WordSet) >> { WordSet ws -> ws.id = 123L; ws }
            wordRepository.saveAll(_ as Set<Word>) >> { Set<Word> words -> words }

        when:
            def result = classUnderTest.copyWordSet(wordSet.id, principal)

        then:
            result.name == wordSet.name
            result.user.email == "user@user.com"
            result.id == 123L
            result.words.size() == 2
            result.words[0].level == 0
            result.words[1].level == 0
    }

    def "copyWordSet should throw exception when word set not found"() {
        given:
            Long id = 1L
            userService.getUser(principal) >> new User("user@user.com")
            wordSetRepository.findById(id) >> Optional.empty()

        when:
            classUnderTest.copyWordSet(id, principal)

        then:
            def e = thrown(RuntimeException)
            e.message == "Word set not found"
    }

    def "copyWordSet should throw exception when word set is not public"() {
        given:
            Long id = 1L
            userService.getUser(principal) >> new User("user1")
            WordSet wordSet = new WordSet(new User("other@user.com"), "S1", "en", "fr", false)
            wordSetRepository.findById(id) >> Optional.of(wordSet)

        when:
            classUnderTest.copyWordSet(id, principal)

        then:
            def e = thrown(RuntimeException)
            e.message == "Word set is not public"
    }

}
