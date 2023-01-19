'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Select from '../ui/inputs/Select'

const LanguageSelection = ({
  languages,
  initialValue,
  update,
  autoUpdate,
}: {
  initialValue?: string
  languages: Array<string>
  update: (language: string) => void
  autoUpdate?: boolean
}) => {
  const [languageIndex, setLanguageIndex] = useState<number | undefined>()

  useEffect(() => {
    if (initialValue) {
      setLanguageIndex(languages.indexOf(initialValue))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <Select value={languageIndex} onChange={updateNativeLanguageInput}>
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
