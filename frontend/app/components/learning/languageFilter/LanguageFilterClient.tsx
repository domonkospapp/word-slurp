'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Select, { Option } from '../../../../ui/inputs/select/Select'

const LanguageFilterClient = ({
  languageOptions,
}: {
  languageOptions: Array<Option>
}) => {
  const getOptionFromSearchParams = (): Option => {
    const ol = searchParams.get('ol')
    const fl = searchParams.get('fl')
    if (ol && fl) {
      return (
        languageOptions.find((lg) => lg.value == `ol=${ol}&fl=${fl}`) ||
        languageOptions[0]
      )
    }
    return languageOptions[0]
  }

  const router = useRouter()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState<Option>(getOptionFromSearchParams())

  useEffect(() => {
    const option = getOptionFromSearchParams()
    setSelected(option)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const updateLanguage = (value: Option) => {
    setSelected(value)
    if (value.value) {
      router.replace(`?${value.value}`)
    } else {
      router.replace('/')
    }
  }

  return (
    <Select
      selected={selected}
      update={updateLanguage}
      options={languageOptions}
    />
  )
}
export default LanguageFilterClient
