'use client'

import { useEffect, useMemo, useState } from 'react'
import Select, { Option } from '../ui/inputs/Select'

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
  const convertToOption = (language: string | undefined) => {
    return {
      text: language || '-',
      value: language || '',
    }
  }

  const getInitialValue = () => convertToOption(initialValue)

  const [language, setLanguage] = useState<Option>(getInitialValue)

  useEffect(() => {
    setLanguage(getInitialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  const changeLanguage = (value: Option) => {
    setLanguage(value)
    update(value.value)
  }

  const generateOptions = () => {
    const options: Array<Option> = languages.map(convertToOption)
    options.unshift(convertToOption(undefined))
    return options
  }

  const options: Array<Option> = useMemo(generateOptions, [languages])

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
