import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import AddWordButton from './components/AddWordButton'
import WordFilter from './components/WordFilter'
import { WordSet } from '../../types/word-set'
import { getWordSets } from '../../utils/clients/wordSetApi'
import WordSetListItem from './components/WordSetListItem'

const WordList = async () => {
  const session = await unstable_getServerSession(authOptions)
  const wordSets: [WordSet] = await getWordSets(undefined, undefined).catch(
    () => null
  )

  return (
    <div>
      <div className="pr-4">
        <WordFilter />
      </div>

      {session?.user ? (
        <div>
          {wordSets &&
            wordSets.map((wordSet, index) => (
              <WordSetListItem key={index} wordSet={wordSet} />
            ))}
          <AddWordButton />
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
