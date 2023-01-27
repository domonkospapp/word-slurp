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

    def "findAllOwn"() {
        given:
            User otherUser = new User("other@user.com")
            entityManager.persist(otherUser)

            entityManager.persist(new WordSet(user, "S1", "nl", "de"))
            entityManager.persist(new WordSet(user, "S2", "es", "de"))
            entityManager.persist(new WordSet(user, "S3", "nl", "it"))

            entityManager.persist(new WordSet(otherUser, "S4", "uk", "de"))
            entityManager.persist(new WordSet(otherUser, "S5", "uk", "de", true))

            entityManager.flush()

        expect:
            wordSetRepository.findAllOwn(user, null, null).size() == 3

            wordSetRepository.findAllOwn(user, "nl", "de").size() == 1
            wordSetRepository.findAllOwn(user, "es", "de").size() == 1
            wordSetRepository.findAllOwn(user, "nl", "it").size() == 1

            wordSetRepository.findAllOwn(user, "nl", null).size() == 2
            wordSetRepository.findAllOwn(user, null, "de").size() == 2

            wordSetRepository.findAllOwn(user, "es", null).size() == 1
            wordSetRepository.findAllOwn(user, null, "it").size() == 1
    }

    def "findAllPublic"() {
        given:
            User otherUser = new User("other@user.com")
            entityManager.persist(otherUser)

            entityManager.persist(new WordSet(otherUser, "S1", "nl", "de", true))
            entityManager.persist(new WordSet(otherUser, "S2", "es", "de", true))
            entityManager.persist(new WordSet(otherUser, "S3", "nl", "it", true))

            entityManager.persist(new WordSet(user, "S4", "uk", "de", true))
            entityManager.persist(new WordSet(user, "S5", "uk", "de", false))
            entityManager.persist(new WordSet(otherUser, "S4", "uk", "de", false))

            entityManager.flush()

        expect:
            wordSetRepository.findAllPublic(user, null, null).size() == 3

            wordSetRepository.findAllPublic(user, "nl", "de").size() == 1
            wordSetRepository.findAllPublic(user, "es", "de").size() == 1
            wordSetRepository.findAllPublic(user, "nl", "it").size() == 1

            wordSetRepository.findAllPublic(user, "nl", null).size() == 2
            wordSetRepository.findAllPublic(user, null, "de").size() == 2

            wordSetRepository.findAllPublic(user, "es", null).size() == 1
            wordSetRepository.findAllPublic(user, null, "it").size() == 1
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
