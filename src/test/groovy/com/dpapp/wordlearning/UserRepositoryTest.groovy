package com.dpapp.wordlearning

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import spock.lang.Specification

import javax.persistence.EntityManager

@DataJpaTest
class UserRepositoryTest extends Specification {

    @Autowired
    private EntityManager entityManager

    @Autowired
    private UserRepository userRepository

    def "existsByUsernameAndEmail"() {
        given:
        final User user = new User("email")
        entityManager.persist(user)
        entityManager.flush()

        expect:
        userRepository.existsByEmail("email")
        !userRepository.existsByEmail("email+")
    }

    def "getByUsernameAndEmail"() {
        given:
        final User user = new User("email")
        entityManager.persist(user)
        entityManager.flush()

        expect:
        userRepository.getByEmail("email").present
        userRepository.getByEmail("email").ifPresent({
            it.email == "email"
        })
        !userRepository.getByEmail("email+").present
    }


}
