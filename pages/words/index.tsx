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
      words: await getWords(token?.idToken),
    },
  }
}

const WordList: React.FC<{ words: [Word] }> = ({ words }) => {
  const session = useSession()

  return (
    <div>
      {session.data ? (
        <div>
          Your words are:
          <div>
            <ul>
              {words &&
                words.map((w: Word, k: number) => (
                  <li key={k}>
                    {w.original} - {w.foreign} ({w.level})
                  </li>
                ))}
            </ul>
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
