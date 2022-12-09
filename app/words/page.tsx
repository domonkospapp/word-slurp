import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getWords } from '../../utils/clients/wordApi'
import { Word } from '../../word'

const WordList = async () => {
  await unstable_getServerSession(authOptions)
  const words: [Word] = await getWords().catch(() => null)

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
      {true ? (
        <div>
          Your words are:
          <div>
            <table>
              <tbody>
                {words &&
                  words.map((w: Word, k: number) => (
                    <tr key={k}>
                      <td></td>
                      <td>{w.originalLanguage}:</td>
                      <td>{w.original}</td>
                      <td>{w.foreignLanguage}:</td>
                      <td>{w.foreign}</td>
                      <td>{getStars(w.level)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Link href="words/create">Add new word</Link>
          </div>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <Link href="login">Go to the login page</Link>
        </div>
      )}
    </div>
  )
}
export default WordList
