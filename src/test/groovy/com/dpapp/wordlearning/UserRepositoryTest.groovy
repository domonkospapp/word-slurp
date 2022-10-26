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
        final User user = new User("username", "email", null)
        entityManager.persist(user)
        entityManager.flush()

        expect:
        userRepository.existsByUsernameAndEmail("username", "email")
        !userRepository.existsByUsernameAndEmail("username", "email+")
        !userRepository.existsByUsernameAndEmail("username+", "email")
    }

    def "getByUsernameAndEmail"() {
        given:
        final User user = new User("username", "email", null)
        entityManager.persist(user)
        entityManager.flush()

        expect:
        userRepository.getByUsernameAndEmail("username", "email").present
        userRepository.getByUsernameAndEmail("username", "email").ifPresent({
            it.username == "username"
            it.email == "email"
        })
        !userRepository.getByUsernameAndEmail("username", "email+").present
        !userRepository.getByUsernameAndEmail("username+", "email").present
    }


}
