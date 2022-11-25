package com.dpapp.wordlearning

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpHeaders
import spock.lang.Specification

import static io.restassured.RestAssured.given
import static org.hamcrest.Matchers.equalTo

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = TestSecurityConfig.class)
class UserControllerRegressionTest extends Specification {

    private static String token = TestSecurityConfig.TEST_0AUTH_TOKEN

    @LocalServerPort
    private int port

    @Autowired
    private UserRepository userRepository

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
                        "nativeLanguage":"german"
                    }
                """)
                .put()
                .then()
                .statusCode(200)
                .body("nativeLanguage", equalTo("german"))
    }

}
