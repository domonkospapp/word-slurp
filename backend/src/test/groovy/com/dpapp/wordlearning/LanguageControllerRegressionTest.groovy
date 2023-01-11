package com.dpapp.wordlearning

import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpHeaders
import spock.lang.Specification

import static io.restassured.RestAssured.given
import static org.hamcrest.Matchers.equalTo
import static org.hamcrest.Matchers.hasItems

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = TestSecurityConfig.class)
class LanguageControllerRegressionTest extends Specification {

    private static String token = TestSecurityConfig.TEST_0AUTH_TOKEN

    @LocalServerPort
    private int port

    @Autowired
    private UserRepository userRepository

    def setup() {
        userRepository.deleteAll()
    }

    def "get languages"() {
        given:
        userRepository.save(new User(TestSecurityConfig.TEST_EMAIL))

        expect:
        given().port(port)
                .basePath("/languages")
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .get()
                .then()
                .statusCode(200)
                .body(
                        "size()", equalTo(188),
                        "\$", hasItems("hu", "de", "en", "fr", "es")
                )
    }

    def "get language map"() {
        given:
        User user = new User(TestSecurityConfig.TEST_EMAIL)
        user.addLanguage("magyar", "hu")
        user.addLanguage("nemet", "de")
        user.addLanguage("angol", "en")
        userRepository.save(user)

        expect:
        given().port(port)
                .basePath("/languageMap")
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .get()
                .then()
                .statusCode(200)
                .body(
                        "size()", equalTo(3),
                        "magyar", equalTo("hu"),
                        "nemet", equalTo("de"),
                        "angol", equalTo("en")
                )
    }

    def "add language map element"() {
        given:
        userRepository.save(new User(TestSecurityConfig.TEST_EMAIL))

        expect:
        given().port(port)
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .contentType("application/json")
                .body("""
                    {"language":"magyar","isoLanguage":"hu"}
                """)
                .post("/languageMap")
                .then()
                .statusCode(200)
                .body("size()", equalTo(1), "magyar", equalTo("hu"))
    }

}
