package com.dpapp.wordlearning.wordset

import com.dpapp.wordlearning.TestSecurityConfig
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserRepository
import com.dpapp.wordlearning.words.Word
import com.dpapp.wordlearning.words.WordRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpHeaders
import spock.lang.Specification

import static io.restassured.RestAssured.given
import static org.hamcrest.Matchers.equalTo
import static org.hamcrest.Matchers.notNullValue

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = TestSecurityConfig.class)
class WordSetControllerRegressionTest extends Specification {

    private static String token = TestSecurityConfig.TEST_0AUTH_TOKEN

    @LocalServerPort
    private int port

    @Autowired
    private UserRepository userRepository

    @Autowired
    private WordSetRepository wordSetRepository

    @Autowired
    private WordRepository wordRepository

    private User user

    void setup() {
        wordRepository.deleteAll()
        wordSetRepository.deleteAll()
        userRepository.deleteAll()
        user = new User(TestSecurityConfig.TEST_EMAIL)
        user.setNativeLanguage("hu")
        userRepository.save(user)
    }

    def "create word set for user"() {
        expect:
            given().port(port)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                    .contentType("application/json")
                    .body("""
                    {
                        "name": "First",
                        "originalLanguage":"de",
                        "foreignLanguage":"en"
                    }
                """)
                    .post("/wordSets")
                    .then()
                    .statusCode(200)
                    .body(
                            "name", equalTo("First"),
                            "originalLanguage", equalTo("de"),
                            "foreignLanguage", equalTo("en"),
                            "isPublic", equalTo(false),
                    )
    }

    def "get word sets for user"() {
        given:
            final WordSet firstWordSet = new WordSet(user, "First", "de", "en")
            final WordSet secondWordSet = new WordSet(user, "Second", "en", "hu")
            final Word wordForSecondWordSet = new Word(secondWordSet, "eat", "essen", 0)
            secondWordSet.addWord(wordForSecondWordSet)
            secondWordSet.setIsPublic(true)

            wordSetRepository.saveAll([firstWordSet, secondWordSet])
            wordRepository.save(wordForSecondWordSet)

        expect:
            given().port(port)
                    .basePath("/wordSets")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                    .get()
                    .then()
                    .statusCode(200)
                    .body(
                            "size()", equalTo(2),
                            "[0].id", notNullValue(),
                            "[0].name", equalTo("First"),
                            "[0].originalLanguage", equalTo("de"),
                            "[0].foreignLanguage", equalTo("en"),
                            "[0].isPublic", equalTo(false),
                            "[1].id", notNullValue(),
                            "[1].name", equalTo("Second"),
                            "[1].originalLanguage", equalTo("en"),
                            "[1].foreignLanguage", equalTo("hu"),
                            "[1].words", notNullValue(),
                            "[1].words.size()", equalTo(1),
                            "[1].words[0].original", equalTo("eat"),
                            "[1].words[0].foreign", equalTo("essen"),
                            "[1].isPublic", equalTo(true),
                    )
    }

    def "get own word sets for user with filter"() {
        given:
            User otherUser = userRepository.save(new User("other@user.com"))
            wordSetRepository.saveAll([
                    new WordSet(user, "S1", "en", "de"),
                    new WordSet(user, "S2", "en", "de"),
                    new WordSet(user, "S3", "en", "de"),
                    new WordSet(user, "S4", "de", "hu"),
                    new WordSet(user, "S5", "de", "hu"),
                    new WordSet(user, "S6", "hu", "de"),
                    new WordSet(otherUser, "S7", "es", "it", true),
                    new WordSet(otherUser, "S8", "es", "it", false),
            ])

            def queryParams = [:]
            if (originalLanguage) queryParams["originalLanguage"] = originalLanguage
            if (foreignLanguage) queryParams["foreignLanguage"] = foreignLanguage

        expect:
            given().port(port)
                    .basePath("/wordSets")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                    .queryParams(queryParams)
                    .get()
                    .then()
                    .statusCode(200)
                    .body(
                            "size()", equalTo(size)
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

    def "get public word sets for user with filter"() {
        given:
            User otherUser = userRepository.save(new User("other@user.com"))
            wordSetRepository.saveAll([
                    new WordSet(otherUser, "S1", "en", "de", true),
                    new WordSet(otherUser, "S2", "en", "de", true),
                    new WordSet(otherUser, "S3", "en", "de", true),
                    new WordSet(otherUser, "S4", "de", "hu", true),
                    new WordSet(otherUser, "S5", "de", "hu", true),
                    new WordSet(otherUser, "S6", "hu", "de", true),
                    new WordSet(user, "S7", "es", "it", true),
                    new WordSet(user, "S8", "es", "it", false),
            ])

            def queryParams = [
                    'isPublic': 'true'
            ]
            if (originalLanguage) queryParams["originalLanguage"] = originalLanguage
            if (foreignLanguage) queryParams["foreignLanguage"] = foreignLanguage

        expect:
            given().port(port)
                    .basePath("/wordSets")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                    .queryParams(queryParams)
                    .get()
                    .then()
                    .statusCode(200)
                    .body(
                            "size()", equalTo(size)
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
            wordSetRepository.saveAll([
                    new WordSet(user, "S1", "en", "de"),
                    new WordSet(user, "S2", "de", "en"),
                    new WordSet(user, "S3", "de", "en"),
                    new WordSet(user, "S4", "hu", "en"),
                    new WordSet(user, "S5", "hu", "en"),
                    new WordSet(user, "S6", "uk", "en"),
            ])

        expect:
            given().port(port)
                    .basePath("/wordSets/languages")
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

    def "edit word set"() {
        given:
            final WordSet wordSet = new WordSet(user, "Set name", "de", "de")
            final Word word = new Word(wordSet, "eat", "essen", 0)
            wordSet.addWord(word)

            wordSetRepository.save(wordSet)
            wordRepository.save(word)

        expect:
            given().port(port)
                    .basePath("/wordSets/{wordSetId}")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                    .pathParam("wordSetId", wordSet.getId())
                    .contentType("application/json")
                    .body("""
                    {
                        "name":"New set name"
                    }
                """)
                    .put()
                    .then()
                    .statusCode(200)
                    .body(
                            "name", equalTo("New set name")
                    )
    }


    def "get word set"() {
        given:
            final WordSet wordSet = new WordSet(user, "First", "de", "en")
            final Word word = new Word(wordSet, "eat", "essen", 0)
            wordSet.addWord(word)

            wordSetRepository.save(wordSet)
            wordRepository.save(word)

        expect:
            given().port(port)
                    .basePath("/wordSets/{wordSetId}")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                    .pathParam("wordSetId", wordSet.getId())
                    .contentType("application/json")
                    .get()
                    .then()
                    .statusCode(200)
                    .body(
                            "id", notNullValue(),
                            "name", equalTo("First"),
                            "originalLanguage", equalTo("de"),
                            "foreignLanguage", equalTo("en"),
                            "words", notNullValue(),
                            "words.size()", equalTo(1)

                    )
    }

    def "can not get others word set"() {
        given:
            final User otherUser = userRepository.save(new User("other@user.com"))
            final WordSet wordSet = new WordSet(otherUser, "First", "de", "en")
            final Word word = new Word(wordSet, "eat", "essen", 0)
            wordSet.addWord(word)

            wordSetRepository.save(wordSet)
            wordRepository.save(word)

        expect:
            given().port(port)
                    .basePath("/wordSets/{wordSetId}")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                    .pathParam("wordSetId", wordSet.getId())
                    .contentType("application/json")
                    .get()
                    .then()
                    .statusCode(500)
    }

    def "copy word set"() {
        given:
            final User otherUser = userRepository.save(new User("other@user.com"))
            final WordSet wordSet = wordSetRepository.save(new WordSet(otherUser, "First", "de", "en", true))
            final Word word = new Word(wordSet, "eat", "essen", 5)
            wordSet.addWord(word)
            wordRepository.save(word)

        expect:
            given().port(port)
                    .basePath("/wordSets/{wordSetId}/copy")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                    .pathParam("wordSetId", wordSet.getId())
                    .contentType("application/json")
                    .post()
                    .then()
                    .statusCode(200)
                    .body(
                            "id", notNullValue(),
                            "name", equalTo("First"),
                            "originalLanguage", equalTo("de"),
                            "foreignLanguage", equalTo("en"),
                            "isPublic", equalTo(false),
                            "words", notNullValue(),
                            "words.size()", equalTo(1),
                            "words[0].level", equalTo(0),
                            "words[0].original", equalTo("eat"),
                            "words[0].foreign", equalTo("essen"),
                    )
    }

}
