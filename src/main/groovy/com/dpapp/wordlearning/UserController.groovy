package com.dpapp.wordlearning

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.projection.ProjectionFactory
import org.springframework.data.projection.SpelAwareProxyProjectionFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController {

    private final UserRepository userRepository

    @Autowired
    UserController(UserRepository userRepository) {
        this.userRepository = userRepository
    }

    @GetMapping("/users")
    UserProjection getUser(CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        User existingUser = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        ProjectionFactory pf = new SpelAwareProxyProjectionFactory()
        return pf.createProjection(UserProjection.class, existingUser)
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

    @PutMapping("/users")
    User updateUser(@RequestBody User user, CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        User existingUser = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        existingUser.setNativeLanguage(user.getNativeLanguage())
        return userRepository.save(existingUser)
    }

}
