package com.dpapp.wordlearning

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController {

    private final UserRepository userRepository

    @Autowired
    UserController(UserRepository userRepository) {
        this.userRepository = userRepository
    }

    @PostMapping("/users")
    User createUser(CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        if (userRepository.existsByEmail(email))
            throw new RuntimeException("User already exists")
        User user = new User(email)
        return userRepository.save(user)
    }

}
