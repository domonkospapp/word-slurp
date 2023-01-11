package com.dpapp.wordlearning

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class LanguageController {

    private final UserRepository userRepository

    @Autowired
    LanguageController(UserRepository userRepository) {
        this.userRepository = userRepository
    }

    @GetMapping("/languages")
    String[] getLanguages() {
        return Locale.getISOLanguages()
    }

    @GetMapping("/languageMap")
    Map<String, String> getLanguageMap(CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        User currentUser = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        return currentUser.getLanguages()
    }

    @PostMapping("/languageMap")
    Map<String, String> addLanguageMapElement(@RequestBody LanguageMapElement languageMapElement, CustomUserJwtAuthenticationToken principal) {
        String email = principal.getPrincipal().getEmail()
        User currentUser = userRepository.getByEmail(email)
                .orElseThrow(() -> new RuntimeException("Wrong user"))
        currentUser.addLanguage(languageMapElement.language, languageMapElement.isoLanguage)
        return userRepository.save(currentUser).getLanguages()
    }

}
