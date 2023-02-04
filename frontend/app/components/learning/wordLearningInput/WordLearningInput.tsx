import { Word } from '../../../../types/word'
import { WordSet } from '../../../../types/word-set'
import { getWordSet, getWordSets } from '../../../../utils/clients/wordSetApi'
import WordLearningInputClient from './WordLearningInputClient'

const WordLearningInput = async ({
  searchParams,
}: {
  searchParams?: { ol?: string; fl?: string; wordSetId?: number }
}) => {
  const getWordSetsBasedOnSearchParams = async () => {
    if (searchParams && searchParams.wordSetId) {
      return await getWordSet(searchParams.wordSetId).then((set) => [set])
    } else if (searchParams && searchParams.ol && searchParams.fl) {
      return await getWordSets(searchParams.ol, searchParams.fl, false)
    }
    return await getWordSets(undefined, undefined, false)
  }
  const words: Array<Word> = await getWordSetsBasedOnSearchParams().then(
    (wordSets) => wordSets.map((wordSet: WordSet) => wordSet.words).flat()
  )

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
        <WordLearningInputClient words={words} />
      </div>
    </div>
  )
}
export default WordLearningInput
