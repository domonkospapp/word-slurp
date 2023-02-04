'use client'

import { Fragment } from 'react'
import { Word } from '../../../../types/word'
import { WordSet } from '../../../../types/word-set'
import DeleteWordButton from '../buttons/DeleteWordButton'
import EditWordButton from '../buttons/EditWordButton'

const WordList = ({
  wordSet,
  isPublic,
  isEditing,
}: {
  wordSet: WordSet
  isPublic: boolean
  isEditing: boolean
}) => {
  const getPoints = (isPublic: boolean, level: number) =>
    isPublic ? '' : level + 'p'

  return (
    <div className="mt-6 ml-2 grid grid-cols-7 items-center justify-center">
      {wordSet.words &&
        wordSet.words.map((w: Word) => (
          <Fragment key={w.id}>
            <div className="col-span-4 mb-4 block border-b-4 border-stone-900 sm:hidden">
              {w.original}
              <br />
              {w.foreign}
            </div>
            <div className="col-span-3 mb-4 hidden border-b-4 border-stone-900 sm:block">
              {w.original}
            </div>
            <div className="col-span-2 mb-4 hidden border-b-4 border-stone-900 sm:block">
              {w.foreign}
            </div>
            <div
              className={`col-span-3 mr-2 sm:col-span-2 ${
                isEditing ? 'text-right' : 'text-right'
              }`}
            >
              {isEditing ? (
                <>
                  <EditWordButton wordId={w.id} />
                  <DeleteWordButton />
                </>
              ) : (
                <div className="mt-3">{getPoints(isPublic, w.level)}</div>
              )}
            </div>
          </Fragment>
        ))}
    </div>
  )
}
export default WordList
