import axios from 'axios'
import { Word } from '../../types/word'

const wordBaseUrl = process.env.BACKEND_BASE_URL + '/words'

export const createWord = (word: Word) =>
  axios
    .post(wordBaseUrl, word, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)

export const updateWord = (word: Word) =>
  axios
    .put(`${wordBaseUrl}/${word.id}`, word, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)

export const getWords = async (
  originalLanguage: string | undefined | string[],
  foreignLanguage: string | undefined | string[]
) => {
  return axios
    .get(wordBaseUrl, {
      params: {
        originalLanguage: originalLanguage,
        foreignLanguage: foreignLanguage,
      },
    })
    .then((res) => res.data)
}

export const getUsedLanguages = () =>
  axios.get(`${wordBaseUrl}/languages`).then((res) => res.data)

export const importWords = (wordCsv: string) => {
  const body = JSON.stringify({
    content: wordCsv,
  })
  return axios
    .post(`${wordBaseUrl}/import`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)
}
