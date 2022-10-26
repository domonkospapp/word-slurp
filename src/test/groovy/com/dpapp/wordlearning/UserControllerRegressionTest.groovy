package com.dpapp.wordlearning

import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import spock.lang.Specification

import static io.restassured.RestAssured.given
import static org.hamcrest.Matchers.equalTo

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerRegressionTest extends Specification {

    @LocalServerPort
    private int port

    def "user registration"() {
        given:
        final String username = "username"
        final String email = "email"

        expect:
        given().port(port)
                .contentType("application/json")
                .body("""{"username" : "${username}" ,"email" : "$email"}""")
                .post("/users")
                .then()
                .statusCode(200)
                .body("username", equalTo(username), "email", equalTo(email))
    }

}
