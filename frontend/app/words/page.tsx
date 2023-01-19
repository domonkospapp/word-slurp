import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getWords } from '../../utils/clients/wordApi'
import { Word } from '../../types/word'
import AddWordButton from './components/AddWordButton'
import LearnSetButton from './components/LearnSetButton'
import EditWordButton from './components/EditWordButton'
import EditSetButton from './components/EditSetButton'
import DeleteWordButton from './components/DeleteWordButton'
import WordFilter from './components/WordFilter'

const WordList = async () => {
  const session = await unstable_getServerSession(authOptions)
  const words: [Word] = await getWords(undefined, undefined).catch(() => null)

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
          <div className="mt-6 grid grid-cols-4 items-center justify-center gap-4">
            <div className="col-span-1">
              <span className="m-2 border-b-4 border-stone-900 shadow-b-normal shadow-pink-200">
                Life 3.0
              </span>
            </div>
            <div className="col-span-1">
              {words && words[0] && (
                <p>
                  {words[0].originalLanguage}/{words[0].foreignLanguage}
                </p>
              )}
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
                {words &&
                  words.map((w: Word, k: number) => (
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
