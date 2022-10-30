package com.dpapp.wordlearning.security

import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken

class CustomUserJwtAuthenticationToken extends JwtAuthenticationToken {
    private final UserPrincipal user

    CustomUserJwtAuthenticationToken(Jwt jwt, UserPrincipal user) {
        super(jwt)
        this.user = Objects.requireNonNull(user, "User should not be null")
    }

    @Override
    UserPrincipal getPrincipal() {
        return user
    }

}
