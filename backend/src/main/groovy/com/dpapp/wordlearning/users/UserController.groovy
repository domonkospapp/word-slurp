package com.dpapp.wordlearning.users

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.projection.ProjectionFactory
import org.springframework.data.projection.SpelAwareProxyProjectionFactory
import org.springframework.web.bind.annotation.*

@RestController
class UserController {

    private final UserService userService

    @Autowired
    UserController(UserService userService) {
        this.userService = userService
    }

    @GetMapping("/users")
    UserProjection getUser(CustomUserJwtAuthenticationToken principal) {
        User existingUser = userService.getUser(principal)
        ProjectionFactory pf = new SpelAwareProxyProjectionFactory()
        return pf.createProjection(UserProjection.class, existingUser)
    }

    @PostMapping("/users")
    User createUser(CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        if (userService.existsByEmail(email)) {
            return null
        }
        return userService.saveUser(new User(email))
    }

    @PutMapping("/users")
    User updateUser(@RequestBody User user, CustomUserJwtAuthenticationToken principal) {
        User existingUser = userService.getUser(principal)
        existingUser.setNativeLanguage(user.getNativeLanguage())
        return userService.saveUser(existingUser)
    }

}
