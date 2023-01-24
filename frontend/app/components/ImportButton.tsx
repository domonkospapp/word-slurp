'use client'
import { useRouter } from 'next/navigation'
import Button from '../../ui/inputs/Button'

const ImportButton = () => {
  const router = useRouter()

  return (
    <Button
      color="bg-green-300"
      onClick={() => {
        router.push('/import')
      }}
    >
      Import my words
    </Button>
  )
}
export default ImportButton
