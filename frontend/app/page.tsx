import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import SetFilter from './components/learning/setFilter/SetFilter'
import { Suspense } from 'react'
import WordLearningInput from './components/learning/wordLearningInput/WordLearningInput'
import { LearningSearchParams } from '../types/learning-search-params'
import LanguageFilter from './components/learning/languageFilter/LanguageFilter'

const Learning = async ({
  searchParams,
}: {
  searchParams?: LearningSearchParams
}) => {
  await unstable_getServerSession(authOptions)
  return (
    <>
      <div className="ml-2 mb-4 grid grid-cols-2 items-center justify-center">
        <div className="col-span-1">Languages</div>
        <div className="col-span-1 flex justify-start sm:pr-9">
          <div className="w-full sm:ml-1 sm:w-1/2">
            {/* @ts-expect-error Server Component */}
            <LanguageFilter />
          </div>
        </div>
        <div className="col-span-1">Sets</div>
        <div className="col-span-1 flex justify-start sm:pr-9">
          <div className="w-full sm:ml-1 sm:w-1/2">
            {/* @ts-expect-error Server Component */}
            <SetFilter />
          </div>
        </div>
      </div>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <WordLearningInput searchParams={searchParams} />
      </Suspense>
    </>
  )
}
export default Learning
