import { Word } from '../../word'
import { getLanguages, getWords, updateWord } from '../../wordApi'
import { ChangeEvent, Suspense, useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseBody } from 'next/dist/server/api-utils/node'
import axios from 'axios'
import { getToken } from 'next-auth/jwt'
import { LanguagePair } from '../../types/languagePair'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const WordLearningInput = dynamic(
  () => import('../../components/WordLearningInput'),
  { ssr: false }
)

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const token = await getToken({ req })
  if (req.method == 'PUT') {
    const body = await parseBody(req, '1mb')
    updateWord(body, token?.idToken)
  }
  return {
    props: {
      words: await getWords(
        query.originalLanguage,
        query.foreignLanguage,
        token?.idToken
      ).catch(() => []),
      languages: await getLanguages(token?.idToken).catch(() => []),
    },
  }
}

const Learning = ({
  words,
  languages,
}: {
  words: Array<Word>
  languages: Array<LanguagePair>
}) => {
  const router = useRouter()
  const [languageIndex, setLanguageIndex] = useState<number | undefined>()

  const levelUp = (word: Word) => {
    word.level = word.level + 1
    axios.put('/words/learning', word)
  }

  const levelDown = (word: Word) => {
    word.level = word.level - 1
    axios.put('/words/learning', word)
  }

  const updateLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const index: number = parseInt(e.target.value)
    setLanguageIndex(index || undefined)
    const currentLanguage = languages[index]

    router.push({
      pathname: '/words/learning',
      query: {
        ...(currentLanguage?.originalLanguage && {
          originalLanguage: currentLanguage.originalLanguage,
        }),
        ...(currentLanguage?.foreignLanguage && {
          foreignLanguage: currentLanguage.foreignLanguage,
        }),
      },
    })
  }

  return (
    <Suspense fallback="Loading words...">
      <span>Select a specific language:</span>
      <select value={languageIndex} onChange={updateLanguage}>
        <option value={undefined}>all</option>
        {languages &&
          languages.map((v, k) => (
            <option key={k} value={k}>
              {v.originalLanguage} - {v.foreignLanguage}
            </option>
          ))}
      </select>
      <WordLearningInput
        words={words}
        levelUp={levelUp}
        levelDown={levelDown}
      />
    </Suspense>
  )
}
export default Learning
