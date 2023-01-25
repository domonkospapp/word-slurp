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
  initialWordSetId,
}: {
  languages: Array<string>
  wordSets: Array<WordSet>
  initialWordSetId?: number
}) => {
  const router = useRouter()

  const [originalLanguage, setOriginalLanguage] = useState<string | undefined>()
  const [foreignLanguage, setForeignLanguage] = useState<string | undefined>()

  const [originalWord, setOriginalWord] = useState<string>('')
  const [foreignWord, setForeignWord] = useState<string>('')

  const [setId, setSetId] = useState<number | undefined>(initialWordSetId)

  console.log(initialWordSetId)

  const createWord = async () => {
    if (setId != undefined) {
      const set = wordSets.find((s) => s.id == setId)
      await fetch('/api/words/create', {
        method: 'POST',
        body: JSON.stringify({
          original: originalWord,
          originalLanguage: originalLanguage,
          foreign: foreignWord,
          foreignLanguage: foreignLanguage,
          wordSet: set,
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
    const id: number = parseInt(e.target.value)
    setSetId(id)
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
          <Select value={setId} onChange={updateSet}>
            <option value={undefined}>-</option>
            {wordSets.map((wordSet) => (
              <option key={wordSet.id} value={wordSet.id}>
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
