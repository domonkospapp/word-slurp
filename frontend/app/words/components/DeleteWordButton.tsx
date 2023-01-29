'use client'
import Button from '../../../ui/inputs/Button'
import { useRouter } from 'next/navigation'

const DeleteWordButton = () => {
  const router = useRouter()

  const deleteWords = () => {
    router.push('words/')
  }

  return (
    <Button onClick={deleteWords} color="bg-red-400">
      X
    </Button>
  )
}
export default DeleteWordButton
