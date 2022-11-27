import { GetServerSideProps } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Word } from '../../word'
import { getWords } from '../../wordApi'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token: JWT | null = await getToken({ req })
  return {
    props: {
      words: await getWords(undefined, undefined, token?.idToken).catch(
        () => null
      ),
    },
  }
}

const WordList: React.FC<{ words: [Word] }> = ({ words }) => {
  const session = useSession()

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
      {session.data ? (
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
