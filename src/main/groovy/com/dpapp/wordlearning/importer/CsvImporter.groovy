package com.dpapp.wordlearning.importer

import com.dpapp.wordlearning.User
import com.dpapp.wordlearning.Word
import org.springframework.web.multipart.MultipartFile

class CsvImporter {

    static List<Word> loadForUser(MultipartFile translations, User user) {
        return getCsvContent(translations).collect { new Word(user, it.get(3), it.get(2), 0) }
    }

    static List<List<String>> getCsvContent(MultipartFile translations) {
        if (!translations.empty) {
            return translations.inputStream.readLines().collect { Arrays.asList(it.split(",")) }
        }
        throw new RuntimeException("File is empty")
    }

}
