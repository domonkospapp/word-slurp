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
class UserControllerRegressionTest extends Specification {

    private static String token = TestSecurityConfig.TEST_0AUTH_TOKEN

    @LocalServerPort
    private int port

    @Autowired
    private UserRepository userRepository

    def setup(){
        userRepository.deleteAll()
    }

    def "get user"() {
        given:
        User user = new User(TestSecurityConfig.TEST_EMAIL)
        user.setNativeLanguage("de")
        userRepository.save(user)

        expect:
        given().port(port)
                .basePath("/users")
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .get()
                .then()
                .statusCode(200)
                .body(
                        "id", notNullValue(),
                        "nativeLanguage", equalTo("de")
                )
    }

    def "user registration"() {
        expect:
        given().port(port)
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .contentType("application/json")
                .post("/users")
                .then()
                .statusCode(200)
                .body("email", equalTo("email"))
    }

    def "user set native language"() {
        given:
        userRepository.save(new User(TestSecurityConfig.TEST_EMAIL))

        expect:
        given().port(port)
                .basePath("/users")
                .header(HttpHeaders.AUTHORIZATION, "Bearer ${token}")
                .contentType("application/json")
                .body("""
                    {
                        "nativeLanguage":"de"
                    }
                """)
                .put()
                .then()
                .statusCode(200)
                .body("nativeLanguage", equalTo("de"))
    }

}
