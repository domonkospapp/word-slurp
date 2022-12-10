'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import LanguageSelection from '../../../components/languageSelection'

const CreateWordForm = ({ languages }: { languages: Array<string> }) => {
  const router = useRouter()

  const [originalLanguage, setOriginalLanguage] = useState<string | undefined>()
  const [foreignLanguage, setForeignLanguage] = useState<string | undefined>()

  const [originalWord, setOriginalWord] = useState<string>('')
  const [foreignWord, setForeignWord] = useState<string>('')

  const createWord = async () => {
    await fetch('/api/words/create', {
      method: 'POST',
      body: JSON.stringify({
        original: originalWord,
        originalLanguage: originalLanguage,
        foreign: foreignWord,
        foreignLanguage: foreignLanguage,
      }),
    })
    router.back()
  }

  const originalWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalWord(e.target.value)
  }

  const foreignWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForeignWord(e.target.value)
  }

  return (
    <>
      Original Language
      <LanguageSelection
        initialValue={originalLanguage}
        languages={languages}
        update={(language: string) => setOriginalLanguage(language)}
        autoUpdate
      />
      <br />
      Original Word
      <input type="text" value={originalWord} onChange={originalWordChange} />
      Foreign Language
      <LanguageSelection
        initialValue={foreignLanguage}
        languages={languages}
        update={(language: string) => setForeignLanguage(language)}
        autoUpdate
      />
      <br />
      Foreign Word
      <input type="text" value={foreignWord} onChange={foreignWordChange} />
      <br />
      <button onClick={createWord}>Create</button>
    </>
  )
}
export default CreateWordForm
