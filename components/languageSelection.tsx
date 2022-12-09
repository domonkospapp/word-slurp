'use client'

import { ChangeEvent, useState } from 'react'

const LanguageSelection = ({
  languages,
  initialValue,
  update,
}: {
  initialValue?: string
  languages: Array<string>
  update: (language: string) => void
}) => {
  const getInitialValue = () => {
    return initialValue ? languages.indexOf(initialValue) : undefined
  }
  const [languageIndex, setLanguageIndex] = useState<number | undefined>(
    getInitialValue()
  )

  const updateNativeLanguageInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const index: number = parseInt(e.target.value)
    setLanguageIndex(index)
  }

  const updateHandler = () => {
    if (languageIndex) {
      update(languages[languageIndex])
    }
  }

  return (
    <>
      <select value={languageIndex} onChange={updateNativeLanguageInput}>
        {languageIndex == undefined && <option value={undefined}>-</option>}
        {languages &&
          languages.map((v, k) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
      </select>
      <button onClick={updateHandler}>Update</button>
    </>
  )
}

export default LanguageSelection
