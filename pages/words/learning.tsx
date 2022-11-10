import { Word } from '../../word'
import WordLearningInput from '../../components/WordLearningInput'
import { getWords, updateWord } from '../../wordApi'
import { Suspense } from 'react'
import { initAxiosAuthHeaderInterceptor } from '../../axiosUtils'
import { GetServerSideProps } from 'next'
import { parseBody } from 'next/dist/server/api-utils/node'
import axios from 'axios'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  await initAxiosAuthHeaderInterceptor({ req })
  if (req.method == 'PUT') {
    const body = await parseBody(req, '1mb')
    await initAxiosAuthHeaderInterceptor({ req })
    updateWord(body)
  }
  return {
    props: {
      words: await getWords(),
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
