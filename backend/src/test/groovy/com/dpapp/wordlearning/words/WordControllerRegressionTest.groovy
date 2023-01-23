package com.dpapp.wordlearning.words

import com.dpapp.wordlearning.TestSecurityConfig
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserRepository
import com.dpapp.wordlearning.wordset.WordSet
import com.dpapp.wordlearning.wordset.WordSetRepository
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

    @Autowired
    private WordSetRepository wordSetRepository

    private User user
    private WordSet wordSet

    void setup() {
        wordRepository.deleteAll()
        wordSetRepository.deleteAll()
        userRepository.deleteAll()
        user = new User(TestSecurityConfig.TEST_EMAIL)
        user.setNativeLanguage("hu")
        userRepository.save(user)
        wordSet = new WordSet(user, "My set")
        wordSetRepository.save(wordSet)
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
                            "wordSet": {
                                "id": "${wordSet.getId()}"
                            }
                        }
                    """)
                    .basePath("/words")
                    .post()
                    .then()
                    .statusCode(200)
                    .body(
                            "original", equalTo(original),
                            "foreign", equalTo(foreign),
//                            "wordSet.id", equalTo(wordSet.getId().toInteger()),
//                            "wordSet.user.id", equalTo(user.getId().toInteger()),
                            "level", equalTo(0)
                    )
    }

    def "edit word"() {
        given:
            final Word word = wordRepository.save(new Word(wordSet, "original", "foreign", 0))
            final WordSet newWordSet = wordSetRepository.save(new WordSet(user, "My new word set"))

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
                            "level":1,
                            "wordSet": {
                                "id": "${newWordSet.getId()}"
                            }
                        }
                    """)
                    .put()
                    .then()
                    .statusCode(200)
                    .body(
                            "original", equalTo("originalx"),
                            "foreign", equalTo("foreignx"),
//                            "wordSet.id", equalTo(newWordSet.getId().toInteger()),
//                            "wordSet.user.id", equalTo(user.getId().toInteger()),
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
                        "[0].foreign", equalTo("useful"),
                        "[0].level", equalTo(0),
                        "[0].wordSet.originalLanguage", equalTo("hu"),
                        "[0].wordSet.foreignLanguage", equalTo("en"),
                        "[0].wordSet.user.id", equalTo(user.getId().toInteger()),

                        "[6].id", notNullValue(),
                        "[6].original", equalTo("kétség"),
                        "[6].foreign", equalTo("doubt"),
                        "[6].level", equalTo(0),
                        "[6].wordSet.originalLanguage", equalTo("hu"),
                        "[6].wordSet.foreignLanguage", equalTo("en"),
                        "[6].wordSet.user.id", equalTo(user.getId().toInteger()),

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
                            "[0].foreign", equalTo("useful"),
                            "[0].level", equalTo(0),
                            "[0].wordSet.originalLanguage", equalTo("hu"),
                            "[0].wordSet.foreignLanguage", equalTo("en"),
                            "[0].wordSet.user.id", equalTo(user.getId().toInteger()),

                            "[6].id", notNullValue(),
                            "[6].original", equalTo("kétség"),
                            "[6].foreign", equalTo("doubt"),
                            "[6].level", equalTo(0),
                            "[6].wordSet.originalLanguage", equalTo("hu"),
                            "[6].wordSet.foreignLanguage", equalTo("en"),
                            "[6].wordSet.user.id", equalTo(user.getId().toInteger()),
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
                        "[0].wordSet.originalLanguage", equalTo("hu"),
                        "[0].foreign", equalTo("useful"),
                        "[0].wordSet.foreignLanguage", equalTo("en"),

                        "[1].original", equalTo("törekvés"),
                        "[1].wordSet.originalLanguage", equalTo("hu"),
                        "[1].foreign", equalTo("aspiration"),
                        "[1].wordSet.foreignLanguage", equalTo("en"),

                        "[2].original", equalTo("jövő"),
                        "[2].wordSet.originalLanguage", equalTo("hu"),
                        "[2].foreign", equalTo("zukunft"),
                        "[2].wordSet.foreignLanguage", equalTo("de"),

                        "[3].original", equalTo("megtiltani"),
                        "[3].wordSet.originalLanguage", equalTo("hu"),
                        "[3].foreign", equalTo("verbieten"),
                        "[3].wordSet.foreignLanguage", equalTo("de"),

                        "[4].original", equalTo("forbid"),
                        "[4].wordSet.originalLanguage", equalTo("en"),
                        "[4].foreign", equalTo("verbieten"),
                        "[4].wordSet.foreignLanguage", equalTo("de"),
                )
    }

}
