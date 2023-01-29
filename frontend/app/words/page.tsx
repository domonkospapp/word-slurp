import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import WordList from './components/WordList'
import AddWordButton from './components/AddWordButton'
import WordFilter from './components/WordFilter'

const PublicSwitch = ({
  isPublic,
  search,
}: {
  isPublic: boolean
  search: string | undefined
}) => {
  let query = ''
  if (search) {
    query += `search=${search}&`
  }
  query += `isPublic=${isPublic}`

  return <Link href={`/words?${query}`}>{isPublic ? 'Public' : 'Private'}</Link>
}

const WordListPage = async ({
  searchParams,
}: {
  searchParams?: { search?: string; isPublic?: string }
}) => {
  const session = await unstable_getServerSession(authOptions)
  const showPublicSets = searchParams?.isPublic === 'true'

  return (
    <div>
      {session?.user ? (
        <div>
          <div className="pr-2">
            <WordFilter />
          </div>
          <div className="flex justify-between">
            <AddWordButton />
            <div className="ml-auto mt-2">
              <PublicSwitch isPublic={false} search={searchParams?.search} />|
              <PublicSwitch isPublic={true} search={searchParams?.search} />
            </div>
          </div>
          {/* @ts-expect-error Server Component */}
          <WordList search={searchParams?.search} isPublic={showPublicSets} />
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
export default WordListPage
