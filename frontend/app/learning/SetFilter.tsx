'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { WordSet } from '../../types/word-set'
import Select from '../../ui/inputs/Select'

const SetFilter = ({ wordSets }: { wordSets: Array<WordSet> }) => {
  const router = useRouter()
  const [setIndex, setSetIndex] = useState<number | undefined>()

  const updateSet = (e: ChangeEvent<HTMLSelectElement>) => {
    const index: number = parseInt(e.target.value)
    setSetIndex(index)
    router.replace(`/learning?wordSetId=${wordSets[index].id}`)
  }
  return (
    <Select value={setIndex} onChange={updateSet}>
      <option value={undefined}>all</option>
      {wordSets.map((wordSet, index) => (
        <option key={index} value={index}>
          {wordSet.name}
        </option>
      ))}
    </Select>
  )
}

export default SetFilter
