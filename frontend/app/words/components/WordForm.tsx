'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import LanguageSelection from '../../../components/LanguageSelection'
import { Word } from '../../../types/word'
import { WordSet } from '../../../types/word-set'
import Button from '../../../ui/inputs/Button'
import Input from '../../../ui/inputs/Input'
import CreateSetForm from './CreateSetForm'
import WordSetSelection from './WordSetSelection'

const WordForm = ({
  languages,
  wordSets,
  initialWordSetId,
  initialWordOriginal,
  initialWordForeign,
  handleSave,
}: {
  languages: Array<string>
  wordSets: Array<WordSet>
  initialWordSetId?: number
  initialWordOriginal?: string
  initialWordForeign?: string
  handleSave: (word: Word) => void
}) => {
  const router = useRouter()

  const getSet = () => {
    return initialWordSetId
      ? wordSets.find((s) => s.id == initialWordSetId)
      : undefined
  }

  const [originalLanguage, setOriginalLanguage] = useState<string | undefined>(
    getSet()?.originalLanguage || undefined
  )
  const [foreignLanguage, setForeignLanguage] = useState<string | undefined>(
    getSet()?.foreignLanguage || undefined
  )

  const [originalWord, setOriginalWord] = useState<string>(
    initialWordOriginal || ''
  )
  const [foreignWord, setForeignWord] = useState<string>(
    initialWordForeign || ''
  )

  const [setId, setSetId] = useState<number | undefined>(initialWordSetId)

  const originalWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalWord(e.target.value)
  }

  const foreignWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForeignWord(e.target.value)
  }

  const updateSet = (wordSetId: number | undefined) => {
    setSetId(wordSetId)

    const wordSet: WordSet | undefined = wordSets.find((s) => s.id == wordSetId)

    if (wordSet && wordSet.originalLanguage) {
      setOriginalLanguage(wordSet.originalLanguage)
    }
    if (wordSet && wordSet.foreignLanguage) {
      setForeignLanguage(wordSet.foreignLanguage)
    }
    if (wordSetId == undefined) {
      setOriginalLanguage(undefined)
      setForeignLanguage(undefined)
    }
  }

  const clickSave = () => {
    const set = wordSets.find((s) => s.id == setId)
    if (set != undefined) {
      // remove zeros
      const word: Word = {
        id: 0,
        original: originalWord,
        foreign: foreignWord,
        wordSet: set,
        level: 0,
      }
      handleSave(word)
    }
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
            disabled={setId != undefined}
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
            disabled={setId != undefined}
          />
        </div>
        <div className="col-span-1 m-2">Select set</div>
        <div className="col-span-1 m-2">... or create a new one</div>
        <div className="col-span-1">
          <WordSetSelection wordSets={wordSets} update={updateSet} />
        </div>
        <div className="col-span-1">
          <CreateSetForm
            originalLanguage={originalLanguage}
            foreignLanguage={foreignLanguage}
          />
        </div>
      </div>
      <div className="mt-6 text-center">
        {
          // fix this
          initialWordOriginal && (
            <Button color="bg-red-400" onClick={router.back}>
              Delete
            </Button>
          )
        }
        <Button color="bg-yellow-200" onClick={router.back}>
          Cancel
        </Button>
        <Button color="bg-green-300" onClick={clickSave}>
          SAVE
        </Button>
      </div>
    </>
  )
}

export default WordForm
