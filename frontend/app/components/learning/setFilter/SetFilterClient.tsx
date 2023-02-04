'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, ReactElement, useState } from 'react'
import Select from '../../../../ui/inputs/Select'

const SetFilterClient = ({ children }: { children: ReactElement }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getInitialSetId = () => {
    const wordSetIdParam = searchParams.get('wordSetId')
    return wordSetIdParam ? parseInt(wordSetIdParam) : undefined
  }

  const [setId, setSetId] = useState<number | undefined>(getInitialSetId)

  const updateSet = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value != 'all') {
      const id: number = parseInt(e.target.value)
      setSetId(id)
      router.replace(`?wordSetId=${id}`)
    } else {
      setSetId(undefined)
      router.replace(`/`)
    }
  }

  return (
    <Select value={setId} onChange={updateSet} fullWidth>
      <option value={undefined}>all</option>
      {children}
    </Select>
  )
}

export default SetFilterClient
