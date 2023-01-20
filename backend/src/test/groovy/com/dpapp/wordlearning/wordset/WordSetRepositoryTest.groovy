package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.users.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import spock.lang.Specification

import javax.persistence.EntityManager

@DataJpaTest
class WordSetRepositoryTest extends Specification {

    @Autowired
    private EntityManager entityManager

    @Autowired
    private WordSetRepository wordSetRepository

    User user

    def setup() {
        user = new User("email")
        entityManager.persist(user)
        entityManager.flush()
    }

    def "findAllByUser"() {
        given:
            entityManager.persist(new WordSet(user, "First set", "de", "en"))
            entityManager.persist(new WordSet(user, "Second set", "es", "it"))
            entityManager.flush()

        expect:
            final List<WordSetProjection> wordSets = wordSetRepository.findAllByUser(user)
            wordSets.size() == 2
            wordSets.get(0).getName() == "First set"
            wordSets.get(0).getOriginalLanguage() == "de"
            wordSets.get(0).getForeignLanguage() == "en"
            !wordSets.get(0).getIsPublic()

            wordSets.get(1).getName() == "Second set"
            wordSets.get(1).getOriginalLanguage() == "es"
            wordSets.get(1).getForeignLanguage() == "it"
            !wordSets.get(1).getIsPublic()
    }

    def "findAll"() {
        given:
            entityManager.persist(new WordSet(user, "S1", "nl", "de"))
            entityManager.persist(new WordSet(user, "S2", "es", "de"))
            entityManager.persist(new WordSet(user, "S3", "nl", "it"))
            entityManager.flush()

        expect:
            wordSetRepository.findAll(user, null, null).size() == 3

            wordSetRepository.findAll(user, "nl", "de").size() == 1
            wordSetRepository.findAll(user, "es", "de").size() == 1
            wordSetRepository.findAll(user, "nl", "it").size() == 1

            wordSetRepository.findAll(user, "nl", null).size() == 2
            wordSetRepository.findAll(user, null, "de").size() == 2

            wordSetRepository.findAll(user, "es", null).size() == 1
            wordSetRepository.findAll(user, null, "it").size() == 1
    }

    def "findAllLanguages"() {
        given:

            User user2 = new User("email2")
            entityManager.persist(user2)

            entityManager.persist(new WordSet(user, "S1", "en", "de",))
            entityManager.persist(new WordSet(user, "S2", "de", "en",))
            entityManager.persist(new WordSet(user, "S3", "en", "hu",))
            entityManager.persist(new WordSet(user, "S4", "en", "hu",))
            entityManager.persist(new WordSet(user, "S5", "en", "hu",))
            entityManager.persist(new WordSet(user, "S6", "en", "hu",))
            entityManager.persist(new WordSet(user, "S7", "en", "hu",))
            entityManager.persist(new WordSet(user2, "S8", "es", "nl",))
            entityManager.flush()

        when:
            List<WordSet> languages = wordSetRepository.findAllLanguages(user)

        then:
            languages.size() == 3

            languages.get(0).getOriginalLanguage() == "en"
            languages.get(0).getForeignLanguage() == "de"

            languages.get(1).getOriginalLanguage() == "de"
            languages.get(1).getForeignLanguage() == "en"

            languages.get(2).getOriginalLanguage() == "en"
            languages.get(2).getForeignLanguage() == "hu"

        when:
            languages = wordSetRepository.findAllLanguages(user2)


        then:
            languages.size() == 1

            languages.get(0).getOriginalLanguage() == "es"
            languages.get(0).getForeignLanguage() == "nl"
    }

}
