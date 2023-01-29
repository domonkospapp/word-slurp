'use client'

import { ChangeEvent, Fragment, useState } from 'react'
import { Word } from '../../../types/word'
import { WordSet } from '../../../types/word-set'
import Input from '../../../ui/inputs/Input'
import AddWordButton from './AddWordButton'
import DeleteWordButton from './DeleteWordButton'
import EditSetButton from './EditSetButton'
import EditWordButton from './EditWordButton'
import LearnSetButton from './LearnSetButton'

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

  const getStars = (count: number) => {
    if (count == 0) return '0'
    let stars = ''
    const countAbs = Math.abs(count)
    for (let index = 0; index < countAbs; index++) {
      stars += count > 0 ? ' * ' : ' - '
    }
    return stars
  }
  return (
    <>
      <div className="mt-6 grid grid-cols-2 items-center justify-center">
        <div className="col-span-1">
          {isEditing ? (
            <Input value={setName} onChange={setNameChange} />
          ) : (
            <span className="m-2 whitespace-nowrap border-b-4 border-stone-900 text-2xl shadow-b-normal shadow-pink-200">
              {wordSet.name}
            </span>
          )}
          {!isEditing && (
            <span className="ml-0 sm:ml-4">
              {wordSet.originalLanguage}/{wordSet.foreignLanguage}
            </span>
          )}
        </div>
        {!isPublic && (
          <div className="col-span-1 mr-2 flex justify-end">
            <EditSetButton editSet={editSet} isEditing={isEditing} />
            {!isEditing && <AddWordButton wordSetId={wordSet.id} />}
          </div>
        )}
      </div>
      <div className="mt-6 grid grid-cols-4 items-center justify-center">
        {wordSet.words &&
          wordSet.words.map((w: Word) => (
            <Fragment key={w.id}>
              <div className="${} col-span-2 m-2 block border-b-4 border-stone-900 shadow-b-normal shadow-pink-200 sm:hidden">
                {w.original}
                <br />
                {w.foreign}
              </div>
              <div className="col-span-1 m-2 hidden border-b-4 border-stone-900 shadow-b-normal shadow-pink-200 sm:block">
                {w.original}
              </div>
              <div className="col-span-1 m-2 hidden border-b-4 border-stone-900 shadow-b-normal shadow-pink-200 sm:block">
                {w.foreign}
              </div>
              {!isEditing && (
                <div className="col-span-1">{getStars(w.level)}</div>
              )}
              <div
                className={`col-span-1 mr-2 flex justify-end ${
                  isEditing ? 'col-span-2' : ''
                }`}
              >
                {isEditing && (
                  <>
                    <EditWordButton wordId={w.id} />
                    <DeleteWordButton />
                  </>
                )}
              </div>
            </Fragment>
          ))}
      </div>
      <div className="mb-8 w-full text-center">
        <LearnSetButton wordSetId={wordSet.id} />
      </div>
    </>
  )
}
export default WordSetListItem
