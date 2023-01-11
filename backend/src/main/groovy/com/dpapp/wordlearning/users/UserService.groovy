package com.dpapp.wordlearning.users


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

    boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email)
    }

    User saveUser(User user){
        return userRepository.save(user)
    }

}
