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
        Optional<User> user = userRepository.getByEmail(email)
        if (user.present) {
            return user.get()
        }
        return userRepository.save(new User(email))
    }

}
