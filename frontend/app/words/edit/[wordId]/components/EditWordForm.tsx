'use client'

import { useRouter } from 'next/navigation'
import { Word } from '../../../../../types/word'
import { WordSet } from '../../../../../types/word-set'
import WordForm from '../../../components/WordForm'

const EditWordForm = ({
  word,
  languages,
  wordSets,
}: {
  word: Word
  languages: Array<string>
  wordSets: Array<WordSet>
}) => {
  const router = useRouter()

  const saveWord = async (wordToUpdate: Word) => {
    await fetch('/api/words/update', {
      method: 'PUT',
      body: JSON.stringify({
        id: word.id,
        original: wordToUpdate.original,
        foreign: wordToUpdate.foreign,
        wordSet: wordToUpdate.wordSet,
      }),
    })
    router.back()
  }

  return (
    <WordForm
      languages={languages}
      wordSets={wordSets}
      handleSave={saveWord}
      initialWordSetId={word.wordSet.id}
      initialWordOriginal={word.original}
      initialWordForeign={word.foreign}
    />
  )
}
export default EditWordForm
