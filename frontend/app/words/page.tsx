import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { Word } from '../../types/word'
import AddWordButton from './components/AddWordButton'
import LearnSetButton from './components/LearnSetButton'
import EditWordButton from './components/EditWordButton'
import EditSetButton from './components/EditSetButton'
import DeleteWordButton from './components/DeleteWordButton'
import WordFilter from './components/WordFilter'
import { WordSet } from '../../types/word-set'
import { getWordSets } from '../../utils/clients/wordSetApi'

const WordList = async () => {
  const session = await unstable_getServerSession(authOptions)
  const wordSets: [WordSet] = await getWordSets(undefined, undefined).catch(
    () => null
  )

  const getStars = (count: number) => {
    if (count == 0) return '0'
    let stars = ''
    const countAbs = Math.abs(count)
    for (let index = 0; index < countAbs; index++) {
      stars += count > 0 ? ' * ' : ' - '
    }
    return stars
  }

  return (
    <div>
      <WordFilter />
      {session?.user ? (
        <div>
          {wordSets &&
            wordSets.map((wordSet, index) => (
              <>
                <div
                  key={index}
                  className="mt-6 grid grid-cols-4 items-center justify-center gap-4"
                >
                  <div className="col-span-1">
                    <span className="m-2 border-b-4 border-stone-900 shadow-b-normal shadow-pink-200">
                      {wordSet.name}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <p>
                      {wordSet.originalLanguage}/{wordSet.foreignLanguage}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <AddWordButton />
                  </div>
                  <div className="col-span-1">
                    <EditSetButton />
                  </div>
                </div>
                <div>
                  <table>
                    <tbody>
                      {wordSet.words &&
                        wordSet.words.map((w: Word, k: number) => (
                          <tr key={k}>
                            <td></td>
                            <td className="p-2">{w.original}</td>
                            <td className="p-2">{w.foreign}</td>
                            <td className="p-2">{getStars(w.level)}</td>
                            <td>
                              <EditWordButton />
                              <DeleteWordButton />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <LearnSetButton />
                </div>
              </>
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
