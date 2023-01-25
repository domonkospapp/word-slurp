'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import Button from '../../../ui/inputs/Button'
import Input from '../../../ui/inputs/Input'

const WordFilter = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState<string>('')

  const searchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const search = () => {
    if (searchText == '') router.replace(`/words`)
    else router.replace(`/words?search=${searchText}`)
  }

  return (
    <div className="flex">
      <Input onChange={searchTextChange} value={searchText} fullWidth />
      <Button onClick={search} color="bg-green-300">
        Search
      </Button>
    </div>
  )
}
export default WordFilter
