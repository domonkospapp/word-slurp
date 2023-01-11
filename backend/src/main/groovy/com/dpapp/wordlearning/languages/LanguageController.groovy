package com.dpapp.wordlearning.languages

import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class LanguageController {

    private final UserService userService

    @Autowired
    LanguageController(UserService userService) {
        this.userService = userService
    }

    @GetMapping("/languages")
    String[] getLanguages() {
        return Locale.getISOLanguages()
    }

    @GetMapping("/languageMap")
    Map<String, String> getLanguageMap(CustomUserJwtAuthenticationToken principal) {
        User currentUser = userService.getUser(principal)
        return currentUser.getLanguages()
    }

    @PostMapping("/languageMap")
    Map<String, String> addLanguageMapElement(@RequestBody LanguageMapElement languageMapElement, CustomUserJwtAuthenticationToken principal) {
        User currentUser = userService.getUser(principal)
        currentUser.addLanguage(languageMapElement.language, languageMapElement.isoLanguage)
        return userService.saveUser(currentUser).getLanguages()
    }

}
