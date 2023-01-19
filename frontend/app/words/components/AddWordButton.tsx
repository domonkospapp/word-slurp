'use client'
import Button from '../../../ui/inputs/Button'
import { useRouter } from 'next/navigation'

const AddWordButton = () => {
  const router = useRouter()

  const addWordToSet = () => {
    router.push('words/create')
  }

  return (
    <Button color="bg-green-300" onClick={addWordToSet}>
      Add
    </Button>
  )
}
export default AddWordButton
