'use client'
import Button from '../../../ui/inputs/Button'
import { useRouter } from 'next/navigation'

const LearnSetButton = () => {
  const router = useRouter()

  const learnSet = () => {
    router.push('learning')
  }

  return (
    <Button onClick={learnSet} color="bg-green-300">
      Learn set
    </Button>
  )
}
export default LearnSetButton
