'use client'
import Button from '../../../ui/inputs/Button'
import { useRouter } from 'next/navigation'

const EditSetButton = () => {
  const router = useRouter()

  const editSet = () => {
    router.push('words/create')
  }

  return (
    <Button onClick={editSet} color="bg-pink-200">
      Edit
    </Button>
  )
}
export default EditSetButton
