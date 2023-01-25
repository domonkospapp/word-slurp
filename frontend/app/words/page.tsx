import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import AddWordButton from './components/AddWordButton'
import WordFilter from './components/WordFilter'
import { WordSet } from '../../types/word-set'
import { getWordSets } from '../../utils/clients/wordSetApi'
import WordSetListItem from './components/WordSetListItem'

const WordList = async ({
  searchParams,
}: {
  searchParams?: { search?: string }
}) => {
  const session = await unstable_getServerSession(authOptions)

  const wordSetFilter = (wordSets: Array<WordSet>) => {
    const searchTerm = searchParams?.search
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

  const wordSets: Array<WordSet> =
    (await getWordSets(undefined, undefined)
      .then(wordSetFilter)
      .catch(() => null)) || []

  return (
    <div>
      {session?.user ? (
        <div>
          <div className="pr-2">
            <WordFilter />
          </div>
          <AddWordButton />
          {wordSets &&
            wordSets.map((wordSet, index) => (
              <WordSetListItem key={index} wordSet={wordSet} />
            ))}
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <Link href="/api/auth/signin">Go to the login page</Link>
        </div>
      )}
    </div>
  )
}
export default WordList
