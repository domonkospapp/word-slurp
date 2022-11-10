import axios from 'axios'
import { Word } from './word'

const BASE_URL_WORDS = process.env.BACKEND_BASE_URL + '/words'

export const getWords = () => axios.get(BASE_URL_WORDS).then((res) => res.data)

export const createWord = (word: Word) =>
  axios
    .post(BASE_URL_WORDS, {
      original: word.original,
      foreign: word.foreign,
    })
    .then((res) => res.data)

export const updateWord = (word: Word) =>
  axios
    .put(`${BASE_URL_WORDS}/${word.id}`, {
      original: word.original,
      foreign: word.foreign,
      level: word.level,
    })
    .then((res) => res.data)

export const importWords = (wordCsv: string) => {
  console.log(JSON.stringify(wordCsv))
  const body = JSON.stringify({
    content: wordCsv,
  })
  axios.post(`${BASE_URL_WORDS}/import`, body).then((res) => res.data)
}
