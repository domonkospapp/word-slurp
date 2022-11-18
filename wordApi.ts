import axios from 'axios'
import { Word } from './word'

const BASE_URL_WORDS = process.env.BACKEND_BASE_URL + '/words'

const withHeader = (token: string | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
}

export const getWords = (token: string | undefined) =>
  axios.get(BASE_URL_WORDS, withHeader(token)).then((res) => res.data)

export const createWord = (word: Word, token: string | undefined) =>
  axios
    .post(
      BASE_URL_WORDS,
      {
        original: word.original,
        foreign: word.foreign,
      },
      withHeader(token)
    )
    .then((res) => res.data)

export const updateWord = (word: Word, token: string | undefined) =>
  axios
    .put(
      `${BASE_URL_WORDS}/${word.id}`,
      {
        original: word.original,
        foreign: word.foreign,
        level: word.level,
      },
      withHeader(token)
    )
    .then((res) => res.data)

export const importWords = (wordCsv: string, token: string | undefined) => {
  console.log(JSON.stringify(wordCsv))
  const body = JSON.stringify({
    content: wordCsv,
  })
  axios
    .post(`${BASE_URL_WORDS}/import`, body, withHeader(token))
    .then((res) => res.data)
}
