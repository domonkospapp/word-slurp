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
        user.setNativeLanguage("hu")
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
                        "originalLanguage":"hu",
                        "foreign":"${foreign}",
                        "foreignLanguage":"en",
                        "level": 5
                    }
                """)
                .post("/words")
                .then()
                .statusCode(200)
                .body(
                        "original", equalTo(original),
                        "originalLanguage", equalTo("hu"),
                        "foreign", equalTo(foreign),
                        "foreignLanguage", equalTo("en"),
                        "level", equalTo(0)
                )
    }

    def "get words for user"() {
        given:
        final Word firstWord = new Word(user, "original 1", "en", "foreign 1", "de", 0)
        final Word secondWord = new Word(user, "original 2", "en", "foreign 2", "de", 1)
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
                        "[0].originalLanguage", equalTo("en"),
                        "[0].foreign", equalTo("foreign 1"),
                        "[0].foreignLanguage", equalTo("de"),
                        "[0].level", equalTo(0),
                        "[1].id", notNullValue(),
                        "[1].original", equalTo("original 2"),
                        "[1].originalLanguage", equalTo("en"),
                        "[1].foreign", equalTo("foreign 2"),
                        "[1].foreignLanguage", equalTo("de"),
                        "[1].level", equalTo(1),
                )
    }

    def "get words for user with filter"() {
        given:
        wordRepository.saveAll([
                new Word(user, "x", "en", "x", "de", 0),
                new Word(user, "x", "en", "x", "de", 0),
                new Word(user, "x", "en", "x", "de", 0),
                new Word(user, "x", "de", "x", "hu", 0),
                new Word(user, "x", "de", "x", "hu", 0),
                new Word(user, "x", "hu", "x", "de", 0),
        ])

        expect:
        given().port(port)
                .basePath("/words")
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .queryParam("originalLanguage", "en")
                .queryParam("foreignLanguage", "de")
                .get()
                .then()
                .statusCode(200)
                .body(
                        "size()", equalTo(3)
                )
        where:
        originalLanguage | foreignLanguage || size
        null             | null            || 6

        "en"             | null            || 3
        "de"             | null            || 2
        "hu"             | null            || 1

        null             | "de"            || 4
        null             | "hu"            || 2

        "en"             | "de"            || 3
        "de"             | "hu"            || 2
        "hu"             | "de"            || 1

        "sp"             | null            || 0
        null             | "sp"            || 0

    }

    def "get language pairs for user"() {
        given:
        wordRepository.saveAll([
                new Word(user, "x", "en", "x", "de", 0),
                new Word(user, "x", "de", "x", "en", 0),
                new Word(user, "x", "de", "x", "en", 0),
                new Word(user, "x", "hu", "x", "en", 0),
                new Word(user, "x", "hu", "x", "en", 0),
                new Word(user, "x", "uk", "x", "en", 0),
        ])

        expect:
        given().port(port)
                .basePath("/words/languages")
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .get()
                .then()
                .statusCode(200)
                .body(
                        "size()", equalTo(4),
                        "[0].originalLanguage", equalTo("en"),
                        "[0].foreignLanguage", equalTo("de"),
                        "[1].originalLanguage", equalTo("de"),
                        "[1].foreignLanguage", equalTo("en"),
                        "[2].originalLanguage", equalTo("hu"),
                        "[2].foreignLanguage", equalTo("en"),
                        "[3].originalLanguage", equalTo("uk"),
                        "[3].foreignLanguage", equalTo("en"),
                )
    }

    def "edit word"() {
        given:
        final Word word = wordRepository.save(new Word(user, "original", "de", "foreign", "de", 0))

        expect:
        given().port(port)
                .basePath("/words/{wordId}")
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .pathParam("wordId", word.getId())
                .contentType("application/json")
                .body("""
                    {
                        "original":"originalx",
                        "originalLanguage":"en",
                        "foreign":"foreignx",
                        "foreignLanguage":"es",
                        "level":1
                    }
                """)
                .put()
                .then()
                .statusCode(200)
                .body(
                        "original", equalTo("originalx"),
                        "originalLanguage", equalTo("en"),
                        "foreign", equalTo("foreignx"),
                        "foreignLanguage", equalTo("es"),
                        "level", equalTo(1)
                )
    }

    def "upload translation file"() {
        given:
        final String TEST_CSV = "build/resources/test/translations_small.csv"
        user.addLanguage("magyar", "hu")
        user.addLanguage("angol", "en")
        userRepository.save(user)


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
                        "[0].originalLanguage", equalTo("hu"),
                        "[0].foreign", equalTo("useful"),
                        "[0].foreignLanguage", equalTo("en"),
                        "[0].level", equalTo(0),
                        "[6].id", notNullValue(),
                        "[6].original", equalTo("kétség"),
                        "[6].originalLanguage", equalTo("hu"),
                        "[6].foreign", equalTo("doubt"),
                        "[6].foreignLanguage", equalTo("en"),
                        "[6].level", equalTo(0),
                )
    }

    def "upload translation string"() {
        given:
        final String TEST_CSV = "build/resources/test/translations_small.csv"
        final String csv = new File(TEST_CSV).readLines().join("\\r\\n")
        String body = """{"content":"${csv}"}"""
        user.addLanguage("magyar", "hu")
        user.addLanguage("angol", "en")
        userRepository.save(user)
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
                        "[0].originalLanguage", equalTo("hu"),
                        "[0].foreign", equalTo("useful"),
                        "[0].foreignLanguage", equalTo("en"),
                        "[0].level", equalTo(0),
                        "[6].id", notNullValue(),
                        "[6].original", equalTo("kétség"),
                        "[6].originalLanguage", equalTo("hu"),
                        "[6].foreign", equalTo("doubt"),
                        "[6].foreignLanguage", equalTo("en"),
                        "[6].level", equalTo(0),
                )
    }

    def "upload multi language translation string"() {
        given:
        final String TEST_CSV = "build/resources/test/translations_small_multi_lang.csv"
        final String csv = new File(TEST_CSV).readLines().join("\\r\\n")
        String body = """{"content":"${csv}"}"""
        user.addLanguage("magyar", "hu")
        user.addLanguage("angol", "en")
        user.addLanguage("német", "de")
        userRepository.save(user)
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
                        "size()", equalTo(5),
                        "[0].id", notNullValue(),
                        "[0].original", equalTo("hasznos"),
                        "[0].originalLanguage", equalTo("hu"),
                        "[0].foreign", equalTo("useful"),
                        "[0].foreignLanguage", equalTo("en"),

                        "[1].original", equalTo("törekvés"),
                        "[1].originalLanguage", equalTo("hu"),
                        "[1].foreign", equalTo("aspiration"),
                        "[1].foreignLanguage", equalTo("en"),

                        "[2].original", equalTo("jövő"),
                        "[2].originalLanguage", equalTo("hu"),
                        "[2].foreign", equalTo("zukunft"),
                        "[2].foreignLanguage", equalTo("de"),

                        "[3].original", equalTo("megtiltani"),
                        "[3].originalLanguage", equalTo("hu"),
                        "[3].foreign", equalTo("verbieten"),
                        "[3].foreignLanguage", equalTo("de"),

                        "[4].original", equalTo("forbid"),
                        "[4].originalLanguage", equalTo("en"),
                        "[4].foreign", equalTo("verbieten"),
                        "[4].foreignLanguage", equalTo("de"),
                )
    }

}
