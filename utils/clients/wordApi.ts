import axios from 'axios'
import { Word } from '../../word'

const wordBaseUrl = process.env.BACKEND_BASE_URL + '/words'

export const createWord = (word: Word) =>
  axios
    .post(wordBaseUrl, word, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)

export const getWords = async () => {
  return axios.get(wordBaseUrl).then((res) => res.data)
}

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
