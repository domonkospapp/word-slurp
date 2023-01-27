'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import Button from '../../../ui/inputs/Button'
import Input from '../../../ui/inputs/Input'

const WordFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchText, setSearchText] = useState<string>('')

  const searchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const search = () => {
    let query = ''
    const isPublic = searchParams.get('isPublic')
    if (searchText != '') {
      query += `search=${searchText}&`
    }
    if (isPublic) {
      query += `isPublic=${isPublic}&`
    }
    if (query.charAt(query.length - 1) === '&') {
      query = query.slice(0, -1)
    }
    router.replace(`/words?${query}`)
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
