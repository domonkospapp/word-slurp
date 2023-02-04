import { Suspense } from 'react'
import SetFilterClient from './SetFilterClient'
import SetFilterOptions from './SetFilterOptions'

const SetFilter = () => {
  return (
    <SetFilterClient>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <SetFilterOptions />
      </Suspense>
    </SetFilterClient>
  )
}

export default SetFilter
