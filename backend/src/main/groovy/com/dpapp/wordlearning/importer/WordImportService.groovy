package com.dpapp.wordlearning.importer


import com.dpapp.wordlearning.security.CustomUserJwtAuthenticationToken
import com.dpapp.wordlearning.users.User
import com.dpapp.wordlearning.users.UserService
import com.dpapp.wordlearning.words.CsvTranslations
import com.dpapp.wordlearning.words.Word
import com.dpapp.wordlearning.words.WordRepository
import com.dpapp.wordlearning.wordset.WordSet
import com.dpapp.wordlearning.wordset.WordSetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class WordImportService {

    private final WordRepository wordRepository
    private final WordSetRepository wordSetRepository
    private final UserService userService
    private final Random random

    @Autowired
    WordImportService(WordRepository wordRepository, WordSetRepository wordSetRepository, UserService userService) {
        this.wordRepository = wordRepository
        this.wordSetRepository = wordSetRepository
        this.userService = userService
        random = new Random()
    }

    List<Word> uploadFileAsFile(MultipartFile translations, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        List<ImportedWord> importedWords = CsvImporter.loadForUser(translations, user)
        List<Word> words = createWordsForUser(importedWords, user)
        return wordRepository.saveAll(words)
    }

    List<Word> uploadFileAsString(CsvTranslations translations, CustomUserJwtAuthenticationToken principal) {
        User user = userService.getUser(principal)
        List<ImportedWord> importedWords = CsvImporter.loadForUser(translations.getContent(), user)
        List<Word> words = createWordsForUser(importedWords, user)
        return wordRepository.saveAll(words)
    }

    private List<Word> createWordsForUser(List<ImportedWord> importedWords, User user) {
        String importId = random.nextInt(100) + 1
        HashMap<String, WordSet> savedWordSets = saveWordSets(generateWordSets(importedWords, user, importId))
        return importedWords.collect {
            new Word(savedWordSets[generateWordSetKey(it, importId)], it.getOriginal(), it.getForeign(), 0)
        }
    }

    private HashMap<String, WordSet> saveWordSets(HashMap<String, WordSet> wordSets) {
        return new HashMap<String, WordSet>(wordSetRepository.saveAll(wordSets.values()).collectEntries { [it.getName(), it] })
    }

    private static HashMap<String, WordSet> generateWordSets(List<ImportedWord> words, User user, String importId) {
        HashMap<String, ImportedWord> uniqueLanguageWords = removeLanguageDuplications(words)
        return transformImportedWordsToWordSets(uniqueLanguageWords, user, importId)
    }

    private static HashMap<String, WordSet> transformImportedWordsToWordSets(HashMap<String, ImportedWord> uniqueLanguageWords, User user, String importId) {
        return new HashMap<String, WordSet>(uniqueLanguageWords.collectEntries {
            [
                    generateWordSetKey(it.key, importId),
                    new WordSet(user, generateWordSetKey(it.key, importId), it.value.getOriginalLanguage(), it.value.getForeignLanguage())
            ]
        })
    }

    private static HashMap<String, ImportedWord> removeLanguageDuplications(List<ImportedWord> words) {
        return new HashMap<String, ImportedWord>(
                words.collectEntries {
                    [generateWordKey(it), it]
                })
    }

    private static String generateWordKey(ImportedWord word) {
        return "${word.getOriginalLanguage()}-${word.getForeignLanguage()}"
    }

    private static String generateWordSetKey(String wordKey, String importId) {
        return "${wordKey}-${importId}"
    }

    private static String generateWordSetKey(ImportedWord word, String importId) {
        return "${generateWordKey(word)}-${importId}"
    }

}
