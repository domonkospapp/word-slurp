import { Word } from '../../word'
import WordLearningInput from '../../components/WordLearningInput'
import { getWords, updateWord } from '../../wordApi'
import { Suspense } from 'react'
import { GetServerSideProps } from 'next'
import { parseBody } from 'next/dist/server/api-utils/node'
import axios from 'axios'
import { getToken } from 'next-auth/jwt'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })
  if (req.method == 'PUT') {
    const body = await parseBody(req, '1mb')
    updateWord(body, token?.idToken)
  }
  return {
    props: {
      words: await getWords(token?.idToken),
    },
  }
}

const Learning = ({ words }: { words: Array<Word> }) => {
  const levelUp = (word: Word) => {
    word.level = word.level + 1
    axios.put('/words/learning', word)
  }

  const levelDown = (word: Word) => {
    word.level = word.level - 1
    axios.put('/words/learning', word)
  }

  return (
    <Suspense fallback="Loading words...">
      <WordLearningInput
        words={words}
        levelUp={levelUp}
        levelDown={levelDown}
      />
    </Suspense>
  )
}
export default Learning
