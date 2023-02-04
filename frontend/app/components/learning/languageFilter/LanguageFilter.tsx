import { Suspense } from 'react'
import LanguageFilterClient from './LanguageFilterClient'
import LanguageOptions from './LanguageOptions'

const LanguageFilter = () => {
  return (
    <LanguageFilterClient>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <LanguageOptions />
      </Suspense>
    </LanguageFilterClient>
  )
}

export default LanguageFilter
