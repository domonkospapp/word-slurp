'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Select from '../ui/inputs/Select'

const LanguageSelection = ({
  languages,
  initialValue,
  update,
  autoUpdate,
  disabled,
}: {
  initialValue?: string
  languages: Array<string>
  update: (language: string) => void
  autoUpdate?: boolean
  disabled?: boolean
}) => {
  const getLanguageIndex = () =>
    initialValue ? languages.indexOf(initialValue) : undefined
  const [languageIndex, setLanguageIndex] = useState<number | undefined>(
    getLanguageIndex
  )

  useEffect(() => {
    setLanguageIndex(getLanguageIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  const updateNativeLanguageInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const index: number = parseInt(e.target.value)
    setLanguageIndex(index)
    if (autoUpdate) {
      update(languages[index])
    }
  }

  const updateHandler = () => {
    if (languageIndex) {
      update(languages[languageIndex])
    }
  }

  return (
    <>
      <Select
        value={languageIndex}
        onChange={updateNativeLanguageInput}
        disabled={disabled}
      >
        {languageIndex == undefined && <option value={undefined}>-</option>}
        {languages &&
          languages.map((v, k) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
      </Select>
      {!autoUpdate && <button onClick={updateHandler}>Update</button>}
    </>
  )
}

export default LanguageSelection
