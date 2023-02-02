'use client'
import Button from '../../../ui/inputs/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LearnSetButton = ({
  wordSetId,
  shouldCopy,
}: {
  wordSetId: number
  shouldCopy: boolean
}) => {
  const router = useRouter()
  const [isCopying, setIsCopying] = useState<boolean>(false)

  const learnSet = () => {
    if (shouldCopy) {
      setIsCopying(true)
      fetch('/api/wordSets/copy', {
        method: 'POST',
        body: JSON.stringify(wordSetId),
      })
        .then((res) => res.json())
        .then((set) => {
          router.push(`?wordSetId=${set.id}`)
        })
    } else {
      router.push(`?wordSetId=${wordSetId}`)
    }
  }

  return (
    <Button onClick={learnSet} color="bg-pink-200" disabled={isCopying}>
      {isCopying ? 'Copy set...' : 'Learn set'}
    </Button>
  )
}
export default LearnSetButton
