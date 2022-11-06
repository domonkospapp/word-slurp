import axios from 'axios'
import { Word } from './word'

const BASE_URL_WORDS = process.env.BACKEND_BASE_URL + '/words'

export const getWords = () => axios.get(BASE_URL_WORDS).then((res) => res.data)

export const createWord = (word: Word) =>
  axios
    .post(
      BASE_URL_WORDS,
      {
        original: word.original,
        foreign: word.foreign,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    )
    .then((res) => res.data)
