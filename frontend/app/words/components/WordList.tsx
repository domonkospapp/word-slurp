import { WordSet } from '../../../types/word-set'
import { getWordSets } from '../../../utils/clients/wordSetApi'
import WordSetListItem from './WordSetListItem'

const WordList = async ({
  search,
  isPublic,
}: {
  search: string | undefined
  isPublic: boolean
}) => {
  const wordSetFilter = (wordSets: Array<WordSet>) => {
    const searchTerm = search
    if (searchTerm) {
      return wordSets.filter(
        (wordSet) =>
          wordSet.name.includes(searchTerm) ||
          wordSetContainsWordLike(wordSet, searchTerm)
      )
    }
    return wordSets
  }

  const wordSetContainsWordLike = (wordSet: WordSet, searchTerm: string) => {
    return wordSet.words.some(
      (word) =>
        word.foreign.includes(searchTerm) || word.original.includes(searchTerm)
    )
  }

  const wordSets: Array<WordSet> = await getWordSets(
    undefined,
    undefined,
    isPublic
  ).then(wordSetFilter)

  return (
    <div>
      {wordSets &&
        wordSets.map((wordSet) => (
          <WordSetListItem
            key={wordSet.id}
            wordSet={wordSet}
            isPublic={isPublic}
          />
        ))}
    </div>
  )
}
export default WordList
