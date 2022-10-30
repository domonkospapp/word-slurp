package com.dpapp.wordlearning.importer

import com.dpapp.wordlearning.User
import com.dpapp.wordlearning.Word
import org.springframework.mock.web.MockMultipartFile
import org.springframework.web.multipart.MultipartFile
import spock.lang.Specification

class CsvImporterTest extends Specification {

    private final String TEST_CSV = "build/resources/test/translations_small.csv"
    private MultipartFile translations

    void setup() {
        File file = new File(TEST_CSV)
        translations = new MockMultipartFile("translations_small.csv", new FileInputStream(file))
    }

    def "test CSV importing with translations_small.csv"() {
        given:
        User user = new User("test", null)
        when:
        List<Word> words = CsvImporter.loadForUser(translations, user)
        then:
        words.size() == 7

        words.get(0).getLevel() == 0
        words.get(0).getUser() == user
        words.get(0).getOriginal() == "hasznos"
        words.get(0).getForeign() == "useful"

        words.get(1).getLevel() == 0
        words.get(1).getUser() == user
        words.get(1).getOriginal() == "törekvés"
        words.get(1).getForeign() == "aspiration"

        words.get(2).getLevel() == 0
        words.get(2).getUser() == user
        words.get(2).getOriginal() == "tönkretesz"
        words.get(2).getForeign() == "ruining"

        words.get(3).getLevel() == 0
        words.get(3).getUser() == user
        words.get(3).getOriginal() == "szórakoztatás"
        words.get(3).getForeign() == "amusement"

        words.get(4).getLevel() == 0
        words.get(4).getUser() == user
        words.get(4).getOriginal() == "dühös"
        words.get(4).getForeign() == "furious"

        words.get(5).getLevel() == 0
        words.get(5).getUser() == user
        words.get(5).getOriginal() == "udvariasan"
        words.get(5).getForeign() == "politely"

        words.get(6).getLevel() == 0
        words.get(6).getUser() == user
        words.get(6).getOriginal() == "kétség"
        words.get(6).getForeign() == "doubt"
    }

}
