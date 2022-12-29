package com.dpapp.wordlearning.words

import com.dpapp.wordlearning.User
import com.dpapp.wordlearning.words.Word
import com.dpapp.wordlearning.words.WordProjection
import com.dpapp.wordlearning.words.WordRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import spock.lang.Specification

import javax.persistence.EntityManager

@DataJpaTest
class WordRepositoryTest extends Specification {

    @Autowired
    private EntityManager entityManager

    @Autowired
    private WordRepository wordRepository

    User user

    def setup() {
        user = new User("email")
        entityManager.persist(user)
        entityManager.flush()
    }

    def "existsByOriginalAndForeign"() {
        given:
        final Word word = new Word(user, "ow", "hu","fw","en",  0)
        entityManager.persist(word)
        entityManager.flush()

        expect:
        wordRepository.existsByOriginalAndForeign("ow", "fw")
        !wordRepository.existsByOriginalAndForeign("ow2", "fw")
        !wordRepository.existsByOriginalAndForeign("ow", "fw2")
    }

    def "findAllByUser"() {
        given:
        entityManager.persist(new Word(user, "ow1", "de","fw1", "en", 0))
        entityManager.persist(new Word(user, "ow2", "es","fw2", "it", 1))
        entityManager.flush()

        expect:
        final List<WordProjection> words = wordRepository.findAllByUser(user)
        words.size() == 2
        words.get(0).getOriginal() == "ow1"
        words.get(0).getOriginalLanguage() == "de"
        words.get(0).getForeign() == "fw1"
        words.get(0).getForeignLanguage() == "en"
        words.get(0).getLevel() == 0
        words.get(1).getOriginal() == "ow2"
        words.get(1).getOriginalLanguage() == "es"
        words.get(1).getForeign() == "fw2"
        words.get(1).getForeignLanguage() == "it"
        words.get(1).getLevel() == 1
    }

    def "findAll"() {
        given:
        entityManager.persist(new Word(user, "x", "nl", "x", "de", 0))
        entityManager.persist(new Word(user, "x", "es", "x", "de", 0))
        entityManager.persist(new Word(user, "x", "nl", "x", "it", 0))
        entityManager.flush()

        expect:
        wordRepository.findAll(user, null, null).size() == 3

        wordRepository.findAll(user, "nl", "de").size() == 1
        wordRepository.findAll(user, "es", "de").size() == 1
        wordRepository.findAll(user, "nl", "it").size() == 1

        wordRepository.findAll(user, "nl", null).size() == 2
        wordRepository.findAll(user, null, "de").size() == 2

        wordRepository.findAll(user, "es", null).size() == 1
        wordRepository.findAll(user, null, "it").size() == 1
    }

    def "findAllLanguages"() {
        given:

        User user2 = new User("email2")
        entityManager.persist(user2)

        entityManager.persist(new Word(user, "x", "en", "x", "de", 0))
        entityManager.persist(new Word(user, "x", "de", "x", "en", 0))
        entityManager.persist(new Word(user, "x", "en", "x", "hu", 0))
        entityManager.persist(new Word(user, "x", "en", "x", "hu", 0))
        entityManager.persist(new Word(user, "x", "en", "x", "hu", 0))
        entityManager.persist(new Word(user, "x", "en", "x", "hu", 0))
        entityManager.persist(new Word(user, "x", "en", "x", "hu", 0))
        entityManager.persist(new Word(user2, "x", "es", "x", "nl", 0))
        entityManager.flush()

        when:
        def languages = wordRepository.findAllLanguages(user)


        then:
        languages.size() == 3

        languages.get(0).getOriginalLanguage() == "en"
        languages.get(0).getForeignLanguage() == "de"

        languages.get(1).getOriginalLanguage() == "de"
        languages.get(1).getForeignLanguage() == "en"

        languages.get(2).getOriginalLanguage() == "en"
        languages.get(2).getForeignLanguage() == "hu"

        when:
        languages = wordRepository.findAllLanguages(user2)


        then:
        languages.size() == 1

        languages.get(0).getOriginalLanguage() == "es"
        languages.get(0).getForeignLanguage() == "nl"
    }

}
