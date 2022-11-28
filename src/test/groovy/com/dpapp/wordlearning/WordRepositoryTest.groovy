package com.dpapp.wordlearning

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
        final Word word = new Word(user, "ow", "ol","fw","fl",  0)
        entityManager.persist(word)
        entityManager.flush()

        expect:
        wordRepository.existsByOriginalAndForeign("ow", "fw")
        !wordRepository.existsByOriginalAndForeign("ow2", "fw")
        !wordRepository.existsByOriginalAndForeign("ow", "fw2")
    }

    def "findAllByUser"() {
        given:
        entityManager.persist(new Word(user, "ow1", "ol1","fw1", "fl1", 0))
        entityManager.persist(new Word(user, "ow2", "ol2","fw2", "fl2", 1))
        entityManager.flush()

        expect:
        final List<WordProjection> words = wordRepository.findAllByUser(user)
        words.size() == 2
        words.get(0).getOriginal() == "ow1"
        words.get(0).getOriginalLanguage() == "ol1"
        words.get(0).getForeign() == "fw1"
        words.get(0).getForeignLanguage() == "fl1"
        words.get(0).getLevel() == 0
        words.get(1).getOriginal() == "ow2"
        words.get(1).getOriginalLanguage() == "ol2"
        words.get(1).getForeign() == "fw2"
        words.get(1).getForeignLanguage() == "fl2"
        words.get(1).getLevel() == 1
    }

    def "findAll"() {
        given:
        entityManager.persist(new Word(user, "x", "ol", "x", "fl", 0))
        entityManager.persist(new Word(user, "x", "ol2", "x", "fl", 0))
        entityManager.persist(new Word(user, "x", "ol", "x", "fl2", 0))
        entityManager.flush()

        expect:
        wordRepository.findAll(user, null, null).size() == 3

        wordRepository.findAll(user, "ol", "fl").size() == 1
        wordRepository.findAll(user, "ol2", "fl").size() == 1
        wordRepository.findAll(user, "ol", "fl2").size() == 1

        wordRepository.findAll(user, "ol", null).size() == 2
        wordRepository.findAll(user, null, "fl").size() == 2

        wordRepository.findAll(user, "ol2", null).size() == 1
        wordRepository.findAll(user, null, "fl2").size() == 1
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
        entityManager.persist(new Word(user2, "x", "sp", "x", "nl", 0))
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

        languages.get(0).getOriginalLanguage() == "sp"
        languages.get(0).getForeignLanguage() == "nl"
    }

}
