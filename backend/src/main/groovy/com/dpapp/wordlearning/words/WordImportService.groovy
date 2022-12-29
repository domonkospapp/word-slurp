package com.dpapp.wordlearning.words


import com.dpapp.wordlearning.User
import com.dpapp.wordlearning.importer.CsvImporter
import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class WordImportService {

    private final WordRepository wordRepository
    private final UserService userService

    @Autowired
    WordImportService(WordRepository wordRepository, UserService userService) {
        this.wordRepository = wordRepository
        this.userService = userService
    }

    List<Word> uploadFileAsFile(MultipartFile translations, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        List<Word> words = CsvImporter.loadForUser(translations, user)
        return wordRepository.saveAll(words)
    }

    List<Word> uploadFileAsString(CsvTranslations translations, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        List<Word> words = CsvImporter.loadForUser(translations.getContent(), user)
        return wordRepository.saveAll(words)
    }

}
