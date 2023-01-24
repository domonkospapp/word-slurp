'use client'
import Button from '../../../ui/inputs/Button'
import { useRouter } from 'next/navigation'

const LearnSetButton = ({ wordSetId }: { wordSetId: number }) => {
  const router = useRouter()

  const learnSet = () => {
    router.push(`learning?wordSetId=${wordSetId}`)
  }

  return (
    <Button onClick={learnSet} color="bg-green-300">
      Learn set
    </Button>
  )
}
export default LearnSetButton
