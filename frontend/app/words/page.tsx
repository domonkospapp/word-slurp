import Link from 'next/link'
import WordList from './components/WordList'
import AddWordButton from './components/AddWordButton'
import WordFilter from './components/WordFilter'
import { Suspense } from 'react'

const PublicSwitch = ({
  isPublic,
  active,
  search,
}: {
  isPublic: boolean
  active: boolean
  search: string | undefined
}) => {
  let query = ''
  if (search) {
    query += `search=${search}&`
  }
  query += `isPublic=${isPublic}`

  return (
    <Link
      className={`${active == isPublic ? 'underline' : ''}`}
      href={`/words?${query}`}
    >
      {isPublic ? 'Public' : 'Private'}
    </Link>
  )
}

const WordListPage = async ({
  searchParams,
}: {
  searchParams?: { search?: string; isPublic?: string }
}) => {
  const showPublicSets = searchParams?.isPublic === 'true'

  return (
    <div>
      <div>
        <div className="pr-2">
          <WordFilter />
        </div>
        <div className="flex justify-between">
          <AddWordButton />
          <div className="ml-auto mt-2 mr-3">
            <PublicSwitch
              isPublic={false}
              search={searchParams?.search}
              active={showPublicSets}
            />
            |
            <PublicSwitch
              isPublic={true}
              search={searchParams?.search}
              active={showPublicSets}
            />
          </div>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          {/* @ts-expect-error Server Component */}
          <WordList search={searchParams?.search} isPublic={showPublicSets} />
        </Suspense>
      </div>
    </div>
  )
}
export default WordListPage
