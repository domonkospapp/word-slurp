'use client'

import { ChangeEvent, Fragment, useState } from 'react'
import { WordSet } from '../../../../types/word-set'
import Input from '../../../../ui/inputs/Input'
import AddWordButton from '../buttons/AddWordButton'
import EditSetButton from '../buttons/EditSetButton'
import LearnSetButton from '../buttons/LearnSetButton'
import WordList from './WordList'

const WordSetListItem = ({
  wordSet,
  isPublic,
}: {
  wordSet: WordSet
  isPublic: boolean
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [setName, setSetName] = useState<string>(wordSet.name)

  const editSet = () => {
    if (isEditing) {
      setIsEditing(false)
      if (setName != wordSet.name) {
        updateWordSet()
      }
    } else {
      setIsEditing(true)
    }
  }

  const updateWordSet = async () => {
    await fetch('/api/wordSets/update', {
      method: 'PUT',
      body: JSON.stringify({
        id: wordSet.id,
        name: setName,
      }),
    })
  }

  const setNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSetName(e.target.value)
  }

  return (
    <>
      <div className="mt-6 grid grid-cols-2 items-center justify-center">
        <div className="col-span-1 flex flex-wrap items-center">
          {isEditing ? (
            <Input value={setName} onChange={setNameChange} />
          ) : (
            <div>
              <span className="m-2 border-b-4 border-stone-900 text-2xl shadow-b-normal shadow-pink-200">
                {wordSet.name}
              </span>
            </div>
          )}
          {!isEditing && (
            <div className="m-2">
              {wordSet.originalLanguage}/{wordSet.foreignLanguage}
            </div>
          )}
        </div>
        {!isPublic && (
          <div className="col-span-1 mr-2 flex justify-end">
            <EditSetButton editSet={editSet} isEditing={isEditing} />
            {!isEditing && <AddWordButton wordSetId={wordSet.id} />}
          </div>
        )}
      </div>
      <WordList wordSet={wordSet} isPublic={isPublic} isEditing={isEditing} />
      <div className="mb-8 w-full text-center">
        <LearnSetButton wordSetId={wordSet.id} shouldCopy={wordSet.isPublic} />
      </div>
    </>
  )
}
export default WordSetListItem
