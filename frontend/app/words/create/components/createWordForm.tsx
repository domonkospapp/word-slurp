'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import LanguageSelection from '../../../../components/languageSelection'
import Button from '../../../../ui/inputs/Button'
import Input from '../../../../ui/inputs/Input'

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
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
        <div className="col-span-1 m-2 hidden sm:block">Words</div>
        <div className="col-span-1 m-2 hidden sm:block">Languages</div>
        <div className="col-span-1 m-2 sm:hidden">Word</div>
        <div className="col-span-1">
          <Input value={originalWord} onChange={originalWordChange} />
        </div>
        <div className="col-span-1 m-2 sm:hidden">Language</div>
        <div className="col-span-1">
          <LanguageSelection
            initialValue={originalLanguage}
            languages={languages}
            update={(language: string) => setOriginalLanguage(language)}
            autoUpdate
          />
        </div>
        <div className="col-span-1 m-2 sm:hidden">Word</div>
        <div className="col-span-1">
          <Input value={foreignWord} onChange={foreignWordChange} />
        </div>
        <div className="col-span-1 m-2 sm:hidden">Language</div>
        <div className="col-span-1">
          <LanguageSelection
            initialValue={foreignLanguage}
            languages={languages}
            update={(language: string) => setForeignLanguage(language)}
            autoUpdate
          />
        </div>
      </div>
      <Button color="bg-green-300" onClick={createWord}>
        CREATE
      </Button>
    </>
  )
}
export default CreateWordForm
