package com.dpapp.wordlearning.importer

import com.dpapp.wordlearning.User
import com.dpapp.wordlearning.words.Word
import org.springframework.mock.web.MockMultipartFile
import org.springframework.web.multipart.MultipartFile
import spock.lang.Specification

class CsvImporterTest extends Specification {

    private final String TEST_CSV = "build/resources/test/translations_small.csv"
    private MultipartFile translations
    private String translationsString

    void setup() {
        File file = new File(TEST_CSV)
        translations = new MockMultipartFile("translations_small.csv", new FileInputStream(file))
        translationsString = file.readLines().join("\n")
    }

    def "test CSV importing with translations_small.csv"() {
        given:
        User user = new User("test", null)
        user.setNativeLanguage("hu")
        user.addLanguage("magyar", "hu")
        user.addLanguage("angol", "en")
        when:
        List<Word> words = CsvImporter.loadForUser(translations, user)
        then:
        validateWords(words, user)
    }

    def "test CSV importing with translations_small.csv as string"() {
        given:
        User user = new User("test", null)
        user.setNativeLanguage("hu")
        user.addLanguage("magyar", "hu")
        user.addLanguage("angol", "en")
        when:
        List<Word> words = CsvImporter.loadForUser(translationsString, user)
        then:
        validateWords(words, user)
    }

    def "test CSV importing with iso languages"() {
        given:
        User user = new User("test", null)
        String isoTranslations = "en,de,x,x\nes,hu,x,x"
        when:
        List<Word> words = CsvImporter.loadForUser(isoTranslations, user)
        then:
        words.size() == 2
        words.get(0).getOriginalLanguage() == "en"
        words.get(0).getForeignLanguage() == "de"
        words.get(1).getOriginalLanguage() == "es"
        words.get(1).getForeignLanguage() == "hu"
    }

    private validateWords(List<Word> words, User user) {
        words.size() == 7

        words.get(0).getLevel() == 0
        words.get(0).getUser() == user
        words.get(0).getOriginal() == "hasznos"
        words.get(0).getOriginalLanguage() == "hu"
        words.get(0).getForeign() == "useful"
        words.get(0).getForeignLanguage() == "en"

        words.get(1).getLevel() == 0
        words.get(1).getUser() == user
        words.get(1).getOriginal() == "törekvés"
        words.get(1).getOriginalLanguage() == "hu"
        words.get(1).getForeign() == "aspiration"
        words.get(1).getForeignLanguage() == "en"

        words.get(2).getLevel() == 0
        words.get(2).getUser() == user
        words.get(2).getOriginal() == "tönkretesz"
        words.get(2).getOriginalLanguage() == "hu"
        words.get(2).getForeign() == "ruining"
        words.get(2).getForeignLanguage() == "en"

        words.get(3).getLevel() == 0
        words.get(3).getUser() == user
        words.get(3).getOriginal() == "szórakoztatás"
        words.get(3).getOriginalLanguage() == "hu"
        words.get(3).getForeign() == "amusement"
        words.get(3).getForeignLanguage() == "en"

        words.get(4).getLevel() == 0
        words.get(4).getUser() == user
        words.get(4).getOriginal() == "dühös"
        words.get(4).getOriginalLanguage() == "hu"
        words.get(4).getForeign() == "furious"
        words.get(4).getForeignLanguage() == "en"

        words.get(5).getLevel() == 0
        words.get(5).getUser() == user
        words.get(5).getOriginal() == "udvariasan"
        words.get(5).getOriginalLanguage() == "hu"
        words.get(5).getForeign() == "politely"
        words.get(5).getForeignLanguage() == "en"

        words.get(6).getLevel() == 0
        words.get(6).getUser() == user
        words.get(6).getOriginal() == "kétség"
        words.get(6).getOriginalLanguage() == "hu"
        words.get(6).getForeign() == "doubt"
        words.get(6).getForeignLanguage() == "en"
    }

}
