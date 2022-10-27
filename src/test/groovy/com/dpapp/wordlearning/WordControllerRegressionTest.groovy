package com.dpapp.wordlearning

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import spock.lang.Specification

import static io.restassured.RestAssured.given
import static org.hamcrest.Matchers.equalTo
import static org.hamcrest.Matchers.notNullValue

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class WordControllerRegressionTest extends Specification {

    @LocalServerPort
    private int port

    @Autowired
    private UserRepository userRepository

    @Autowired
    private WordRepository wordRepository

    private User user

    void setup() {
        wordRepository.deleteAll()
        userRepository.deleteAll()
        user = new User("username", "email", null)
        userRepository.save(user)
    }

    def "create word for user"() {
        given:
        final String original = "original word"
        final String foreign = "foreign word"

        expect:
        given().port(port)
                .contentType("application/json")
                .body("""
                    {
                        "user": {
                            "username":"${user.getUsername()}",
                            "email":"${user.getEmail()}"
                        },
                        "original":"${original}",
                        "foreign":"${foreign}"
                    }
                """)
                .post("/words")
                .then()
                .statusCode(200)
                .body(
                        "original", equalTo(original),
                        "foreign", equalTo(foreign),
                        "level", equalTo(0)
                )
    }

    def "get words for user"() {
        given:
        final Word firstWord = new Word(user, "original 1", "foreign 1", 0)
        final Word secondWord = new Word(user, "original 2", "foreign 2", 1)
        wordRepository.saveAll([firstWord, secondWord])

        expect:
        given().port(port)
                .basePath("/words")
                .queryParams("username", user.getUsername(), "email", user.getEmail())
                .get()
                .then()
                .statusCode(200)
                .body(
                        "size()", equalTo(2),
                        "[0].id", notNullValue(),
                        "[0].original", equalTo("original 1"),
                        "[0].foreign", equalTo("foreign 1"),
                        "[0].level", equalTo(0),
                        "[1].id", notNullValue(),
                        "[1].original", equalTo("original 2"),
                        "[1].foreign", equalTo("foreign 2"),
                        "[1].level", equalTo(1),
                )
    }

    def "edit word"() {
        given:
        final Word word = wordRepository.save(new Word(user, "original", "foreign", 0))

        expect:
        given().port(port)
                .basePath("/words/{wordId}")
                .pathParam("wordId", word.getId())
                .queryParams("username", user.getUsername(), "email", user.getEmail())
                .contentType("application/json")
                .body("""
                    {
                        "user": {
                            "username":"${user.getUsername()}",
                            "email":"${user.getEmail()}"
                        },
                        "original":"originalx",
                        "foreign":"foreignx",
                        "level":1
                    }
                """)
                .put()
                .then()
                .statusCode(200)
                .body(
                        "original", equalTo("originalx"),
                        "foreign", equalTo("foreignx"),
                        "level", equalTo(1)
                )
    }

}
