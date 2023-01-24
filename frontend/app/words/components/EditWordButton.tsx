'use client'
import Button from '../../../ui/inputs/Button'
import { useRouter } from 'next/navigation'

const EditWordButton = ({ wordId }: { wordId: number }) => {
  const router = useRouter()

  const editWord = () => {
    router.push('words/edit/' + wordId)
  }

  return (
    <Button onClick={editWord} color="bg-yellow-200">
      Edit
    </Button>
  )
}
export default EditWordButton
