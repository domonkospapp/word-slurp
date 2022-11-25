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


}
