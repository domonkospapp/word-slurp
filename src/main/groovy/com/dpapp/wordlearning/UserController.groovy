package com.dpapp.wordlearning

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController {

    private final UserRepository userRepository

    @Autowired
    UserController(UserRepository userRepository) {
        this.userRepository = userRepository
    }

    @PostMapping("/users")
    User createUser(@RequestBody User user) {
        if (userRepository.existsByUsernameAndEmail(user.getUsername(), user.getEmail()))
            throw new RuntimeException("User already exists")
        return userRepository.save(user)
    }

}
