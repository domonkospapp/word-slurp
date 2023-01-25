'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { WordSet } from '../../types/word-set'
import Select from '../../ui/inputs/Select'

const SetFilter = ({ wordSets }: { wordSets: Array<WordSet> }) => {
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
      router.replace(`/learning?wordSetId=${id}`)
    } else {
      setSetId(undefined)
      router.replace(`/learning`)
    }
  }

  return (
    <Select value={setId} onChange={updateSet}>
      <option value={undefined}>all</option>
      {wordSets.map((wordSet, index) => (
        <option key={index} value={wordSet.id}>
          {wordSet.name}
        </option>
      ))}
    </Select>
  )
}

export default SetFilter
