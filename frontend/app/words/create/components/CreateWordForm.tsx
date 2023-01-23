'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import LanguageSelection from '../../../../components/languageSelection'
import { WordSet } from '../../../../types/word-set'
import Button from '../../../../ui/inputs/Button'
import Input from '../../../../ui/inputs/Input'
import Select from '../../../../ui/inputs/Select'
import CreateSetForm from './CreateSetForm'

const CreateWordForm = ({
  languages,
  wordSets,
}: {
  languages: Array<string>
  wordSets: Array<WordSet>
}) => {
  const router = useRouter()

  const [originalLanguage, setOriginalLanguage] = useState<string | undefined>()
  const [foreignLanguage, setForeignLanguage] = useState<string | undefined>()

  const [originalWord, setOriginalWord] = useState<string>('')
  const [foreignWord, setForeignWord] = useState<string>('')

  const [setIndex, setSetIndex] = useState<number | undefined>()

  const createWord = async () => {
    if (setIndex != undefined) {
      await fetch('/api/words/create', {
        method: 'POST',
        body: JSON.stringify({
          original: originalWord,
          originalLanguage: originalLanguage,
          foreign: foreignWord,
          foreignLanguage: foreignLanguage,
          wordSet: wordSets[setIndex],
        }),
      })
      router.back()
    } else {
      console.log('Select a set!')
    }
  }

  const originalWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalWord(e.target.value)
  }

  const foreignWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForeignWord(e.target.value)
  }

  const updateSet = (e: ChangeEvent<HTMLSelectElement>) => {
    const index: number = parseInt(e.target.value)
    setSetIndex(index)
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
        <div className="col-span-1 m-2">Set</div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <Select value={setIndex} onChange={updateSet}>
            <option value={undefined}>-</option>
            {wordSets.map((wordSet, index) => (
              <option key={index} value={index}>
                {wordSet.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-1">
          <CreateSetForm />
        </div>
      </div>
      <Button color="bg-green-300" onClick={createWord}>
        CREATE
      </Button>
    </>
  )
}
export default CreateWordForm
