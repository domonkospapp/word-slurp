'use client'
import { useRouter } from 'next/navigation'
import Button from '../../../../ui/inputs/Button'

const EditWordButton = ({ wordId }: { wordId: number }) => {
  const router = useRouter()

  const editWord = () => {
    router.push('words/edit/' + wordId)
  }

  return (
    <Button onClick={editWord} color="bg-violet-300">
      Edit
    </Button>
  )
}
export default EditWordButton
