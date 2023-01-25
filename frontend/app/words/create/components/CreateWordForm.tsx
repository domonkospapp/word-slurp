'use client'

import { useRouter } from 'next/navigation'
import { Word } from '../../../../types/word'
import { WordSet } from '../../../../types/word-set'
import WordForm from '../../components/WordForm'

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

  const createWord = async (word: Word) => {
    await fetch('/api/words/create', {
      method: 'POST',
      body: JSON.stringify({
        original: word.original,
        foreign: word.foreign,
        wordSet: word.wordSet,
      }),
    })
    router.back()
  }

  return (
    <WordForm
      handleSave={createWord}
      languages={languages}
      wordSets={wordSets}
      initialWordSetId={initialWordSetId}
    />
  )
}

export default CreateWordForm
