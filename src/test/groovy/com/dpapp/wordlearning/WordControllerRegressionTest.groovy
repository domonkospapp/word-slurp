package com.dpapp.wordlearning

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpHeaders
import spock.lang.Specification

import static io.restassured.RestAssured.given
import static org.hamcrest.Matchers.equalTo
import static org.hamcrest.Matchers.notNullValue

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = TestSecurityConfig.class)
class WordControllerRegressionTest extends Specification {

    private static String token = TestSecurityConfig.TEST_0AUTH_TOKEN

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
        user = new User(TestSecurityConfig.TEST_EMAIL)
        userRepository.save(user)
    }

    def "create word for user"() {
        given:
        final String original = "original word"
        final String foreign = "foreign word"

        expect:
        given().port(port)
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .contentType("application/json")
                .body("""
                    {
                        "original":"${original}",
                        "foreign":"${foreign}",
                        "level": 5
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
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
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
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .pathParam("wordId", word.getId())
                .contentType("application/json")
                .body("""
                    {
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

    def "upload translation file"() {
        given:
        final String TEST_CSV = "build/resources/test/translations_small.csv"

        expect:
        given().port(port)
                .basePath("/words/translations")
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .multiPart("translations", new File(TEST_CSV))
                .post()
                .then()
                .statusCode(200)
                .body(
                        "size()", equalTo(7),
                        "[0].id", notNullValue(),
                        "[0].original", equalTo("hasznos"),
                        "[0].foreign", equalTo("useful"),
                        "[0].level", equalTo(0),
                        "[6].original", equalTo("kétség"),
                        "[6].foreign", equalTo("doubt"),
                        "[6].level", equalTo(0),
                )
    }

    def "upload translation string"() {
        given:
        final String TEST_CSV = "build/resources/test/translations_small.csv"
        final String csv = new File(TEST_CSV).readLines().join("\\r\\n")
        String body = """{"content":"${csv}"}"""
        expect:
        given().port(port)
                .basePath("/words/import")
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .contentType("application/json")
                .body(body)
                .post()
                .then()
                .statusCode(200)
                .body(
                        "size()", equalTo(7),
                        "[0].id", notNullValue(),
                        "[0].original", equalTo("hasznos"),
                        "[0].foreign", equalTo("useful"),
                        "[0].level", equalTo(0),
                        "[6].original", equalTo("kétség"),
                        "[6].foreign", equalTo("doubt"),
                        "[6].level", equalTo(0),
                )
    }

}
