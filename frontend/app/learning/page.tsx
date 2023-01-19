import { Word } from '../../types/word'
import { LanguagePair } from '../../types/languagePair'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getUsedLanguages, getWords } from '../../utils/clients/wordApi'
import LanguageFilter from './languageFilter'
import WordLearningInput from '../../components/WordLearningInput'

const Learning = async ({
  searchParams,
}: {
  searchParams?: { ol?: string; fl?: string }
}) => {
  await unstable_getServerSession(authOptions)

  const searchParamsAreValid =
    searchParams && searchParams.ol && searchParams.fl

  const words: [Word] = searchParamsAreValid
    ? await getWords(searchParams.ol, searchParams.fl).catch(() => null)
    : await getWords(undefined, undefined)

  const languages: Array<LanguagePair> = await getUsedLanguages().catch(
    () => null
  )

  return (
    <>
      <span className="m-2">Select a specific language:</span>
      <LanguageFilter languages={languages} />
      <WordLearningInput words={words} />
    </>
  )
}
export default Learning
