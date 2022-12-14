package com.dpapp.wordlearning.security

import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.stereotype.Component

@Component
class GlobalAuthenticationConfigurer extends GlobalAuthenticationConfigurerAdapter {

    @Override
    void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(new AuthenticationProvider() {
            @Override
            Authentication authenticate(Authentication authentication) throws AuthenticationException {
                return authentication
            }

            @Override
            boolean supports(Class<?> authentication) {
                return CustomUserJwtAuthenticationToken.class.isAssignableFrom(authentication)
            }
        })
    }
}
