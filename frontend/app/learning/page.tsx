import { LanguagePair } from '../../types/languagePair'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import LanguageFilter from './languageFilter'
import WordLearningInput from '../../components/WordLearningInput'
import {
  getUsedLanguages,
  getWordSet,
  getWordSets,
} from '../../utils/clients/wordSetApi'
import { WordSet } from '../../types/word-set'
import { Word } from '../../types/word'
import SetFilter from './SetFilter'

const Learning = async ({
  searchParams,
}: {
  searchParams?: { ol?: string; fl?: string; wordSetId?: number }
}) => {
  await unstable_getServerSession(authOptions)

  const getWordSetsBasedOnSearchParams = async () => {
    if (searchParams && searchParams.wordSetId) {
      return await getWordSet(searchParams.wordSetId).then((set) => [set])
    } else if (searchParams && searchParams.ol && searchParams.fl) {
      return await getWordSets(searchParams.ol, searchParams.fl)
    }
    return await getWordSets(undefined, undefined)
  }

  const words: Array<Word> = await getWordSetsBasedOnSearchParams().then(
    (wordSets) => wordSets.map((wordSet: WordSet) => wordSet.words).flat()
  )
  const wordSetFilter: [WordSet] = await getWordSets(undefined, undefined)

  const languages: Array<LanguagePair> = await getUsedLanguages().catch(
    () => null
  )

  return (
    <>
      <span className="m-2">Select a specific language:</span>
      <LanguageFilter languages={languages} />
      <SetFilter wordSets={wordSetFilter} />
      <WordLearningInput words={words} />
    </>
  )
}
export default Learning
