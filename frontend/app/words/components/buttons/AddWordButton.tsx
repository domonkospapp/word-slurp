'use client'
import Button from '../../../../ui/inputs/Button'
import { useRouter } from 'next/navigation'

const AddWordButton = ({ wordSetId }: { wordSetId?: number }) => {
  const router = useRouter()

  const addWordToSet = () => {
    if (wordSetId) {
      router.push(`words/create?wordSetId=${wordSetId}`)
    } else {
      router.push('words/create')
    }
  }

  return (
    <Button color="bg-green-300" onClick={addWordToSet}>
      {wordSetId ? 'Add' : 'Create new word'}
    </Button>
  )
}
export default AddWordButton
