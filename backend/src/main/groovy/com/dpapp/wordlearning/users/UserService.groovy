package com.dpapp.wordlearning.users

import com.dpapp.wordlearning.User
import com.dpapp.wordlearning.UserRepository
import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService {

    private final UserRepository userRepository

    @Autowired
    UserService(UserRepository userRepository) {
        this.userRepository = userRepository
    }

    User getUser(String email) {
        return userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
    }

    User getUser(CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        return getUser(email)
    }

}
