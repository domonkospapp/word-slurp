package com.dpapp.wordlearning

import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder

import java.time.Instant

@TestConfiguration
class TestSecurityConfig {

    static final String TEST_0AUTH_TOKEN = "token"
    static final String TEST_EMAIL = "email"

    @Bean
    JwtDecoder jwtDecoder() {
        return new JwtDecoder() {
            @Override
            Jwt decode(String token) {
                return jwt()
            }
        }
    }

    static Jwt jwt() {
        return new Jwt(
                TEST_0AUTH_TOKEN,
                Instant.now(),
                Instant.now().plusSeconds(30),
                [alg: "none"],
                [email: TEST_EMAIL]
        )
    }

}
