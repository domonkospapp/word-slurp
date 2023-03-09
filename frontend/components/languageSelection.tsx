'use client'

import { useEffect, useState } from 'react'
import Select, { Option } from '../ui/inputs/select/Select'

const LanguageSelection = ({
  languages,
  initialValue,
  update,
  disabled,
}: {
  initialValue?: string
  languages: Array<string>
  update: (language: string) => void
  autoUpdate?: boolean
  disabled?: boolean
}) => {
  const getInitialValue = () => {
    return {
      text: initialValue || '-',
      value: initialValue || '',
    }
  }

  const [language, setLanguage] = useState<Option>(getInitialValue)

  useEffect(() => {
    setLanguage(getInitialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  const changeLanguage = (value: Option) => {
    setLanguage(value)
    update(value.value)
  }

  const options: Array<Option> = languages.map((l) => {
    return { text: l, value: l }
  })

  return (
    <Select
      options={options}
      selected={language}
      update={changeLanguage}
      disabled={disabled}
    />
  )
}

export default LanguageSelection
