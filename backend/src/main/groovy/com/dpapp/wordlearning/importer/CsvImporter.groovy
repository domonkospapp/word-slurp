package com.dpapp.wordlearning.importer

import com.dpapp.wordlearning.users.User
import org.springframework.web.multipart.MultipartFile

class CsvImporter {

    static List<ImportedWord> loadForUser(MultipartFile translations, User user) {
        if (translations.empty) {
            throw new RuntimeException("File is empty")
        }
        return convertCsvToWords(translations.inputStream.readLines(), user)
    }

    static List<ImportedWord> loadForUser(String translations, User user) {
        return convertCsvToWords(translations.readLines(), user)
    }

    private static List<ImportedWord> convertCsvToWords(List<String> csvLines, User user) {
        return csvLines.collect { Arrays.asList(it.split(",")) }
                .findAll { it.size() == 4 }.collect { createWord(user, it) }.findAll { it }
    }

    // line: angol,magyar,useful,hasznos
    private static ImportedWord createWord(User user, List<String> line) {
        String lang1 = convertToIsoLang(line.get(0), user)
        String lang2 = convertToIsoLang(line.get(1), user)
        if (!lang1 || !lang2) {
            return null
        }
        String word1 = line.get(2)
        String word2 = line.get(3)

        if (user.getNativeLanguage() == lang2)
            return new ImportedWord(word2, lang2, word1, lang1)
        return new ImportedWord(word1, lang1, word2, lang2)
    }

    private static String convertToIsoLang(String lang, User user) {
        return Locale.getISOLanguages().contains(lang) ? lang : user.getLanguages().get(lang)
    }

}
