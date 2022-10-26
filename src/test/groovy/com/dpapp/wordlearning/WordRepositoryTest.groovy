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
        user = new User("username", "email", null)
        entityManager.persist(user)
        entityManager.flush()
    }

    def "existsByOriginalAndForeign"() {
        given:
        final Word word = new Word(user, "o1", "f1", 0)
        entityManager.persist(word)
        entityManager.flush()

        expect:
        wordRepository.existsByOriginalAndForeign("o1", "f1")
        !wordRepository.existsByOriginalAndForeign("o2", "f1")
        !wordRepository.existsByOriginalAndForeign("o1", "f2")
    }

    def "findAllByUser"() {
        given:
        entityManager.persist(new Word(user, "o1", "f1", 0))
        entityManager.persist(new Word(user, "o2", "f2", 1))
        entityManager.flush()

        expect:
        final List<WordProjection> words = wordRepository.findAllByUser(user)
        words.size() == 2
        words.get(0).getOriginal() == "o1"
        words.get(0).getForeign() == "f1"
        words.get(0).getLevel() == 0
        words.get(1).getOriginal() == "o2"
        words.get(1).getForeign() == "f2"
        words.get(1).getLevel() == 1
    }


}
