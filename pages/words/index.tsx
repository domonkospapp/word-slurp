import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { initAxiosAuthHeaderInterceptor } from '../../axiosUtils'
import { Word } from '../../word'
import { getWords } from '../../wordApi'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  await initAxiosAuthHeaderInterceptor({ req })
  return {
    props: {
      words: await getWords(),
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
