package com.dpapp.wordlearning.importer

import com.dpapp.wordlearning.User
import com.dpapp.wordlearning.Word
import org.springframework.web.multipart.MultipartFile

class CsvImporter {

    static List<Word> loadForUser(MultipartFile translations, User user) {
        if (translations.empty) {
            throw new RuntimeException("File is empty")
        }
        return convertCsvToWords(translations.inputStream.readLines(), user)
    }

    static List<Word> loadForUser(String translations, User user) {
        return convertCsvToWords(translations.readLines(), user)
    }

    private static List<Word> convertCsvToWords(List<String> csvLines, User user) {
        return csvLines.collect { Arrays.asList(it.split(",")) }
                .findAll { it.size() == 4 }.collect { createWord(user, it) }.findAll { it }
    }

    // line: angol,magyar,useful,hasznos
    private static Word createWord(User user, List<String> line) {
        String lang1 = convertToIsoLang(line.get(0), user)
        String lang2 = convertToIsoLang(line.get(1), user)
        if (!lang1 || !lang2) {
            return null
        }
        String word1 = line.get(2)
        String word2 = line.get(3)

        if (user.getNativeLanguage() == lang2)
            return new Word(user, word2, lang2, word1, lang1, 0)
        return new Word(user, word1, lang1, word2, lang2, 0)
    }

    private static String convertToIsoLang(String lang, User user) {
        return Locale.getISOLanguages().contains(lang) ? lang : user.getLanguages().get(lang)
    }

}
