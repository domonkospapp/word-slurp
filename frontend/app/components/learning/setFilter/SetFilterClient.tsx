'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Select from '../../../../ui/inputs/Select'
import { Option } from '../../../../ui/inputs/Select'

const SetFilterClient = ({ setOptions }: { setOptions: Array<Option> }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getOptionFromSearchParams = () => {
    const wordSetIdParam = searchParams.get('wordSetId')
    return setOptions.find((o) => o.value == wordSetIdParam) || setOptions[0]
  }

  const [selectedSet, setSelectedSet] = useState<Option>(
    getOptionFromSearchParams()
  )

  useEffect(() => {
    const selected = getOptionFromSearchParams()
    setSelectedSet(selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const updateSet = (value: Option) => {
    setSelectedSet(value)
    if (value.value != '') {
      router.replace(`?wordSetId=${value.value}`)
    } else {
      router.replace(`/`)
    }
  }

  return (
    <Select selected={selectedSet} update={updateSet} options={setOptions} />
  )
}

export default SetFilterClient
