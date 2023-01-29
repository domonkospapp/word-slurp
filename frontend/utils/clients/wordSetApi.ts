import axios from 'axios'
import { WordSet } from '../../types/word-set'

const wordSetBaseUrl = process.env.BACKEND_BASE_URL + '/wordSets'

export const createWordSet = (wordSet: WordSet) =>
  axios
    .post(wordSetBaseUrl, wordSet, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)

export const updateWordSet = (wordSet: WordSet) =>
  axios
    .put(`${wordSetBaseUrl}/${wordSet.id}`, wordSet, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)

export const copyWordSet = (setId: number) =>
  axios
    .post(
      `${wordSetBaseUrl}/${setId}/copy`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => res.data)

export const getWordSet = async (setId: number) => {
  return axios.get(`${wordSetBaseUrl}/${setId}`).then((res) => res.data)
}

export const getWordSets = async (
  originalLanguage: string | undefined | string[],
  foreignLanguage: string | undefined | string[],
  isPublic: boolean
) => {
  return axios
    .get(wordSetBaseUrl, {
      params: {
        originalLanguage: originalLanguage,
        foreignLanguage: foreignLanguage,
        isPublic: isPublic,
      },
    })
    .then((res) => res.data)
}

export const getUsedLanguages = () =>
  axios.get(`${wordSetBaseUrl}/languages`).then((res) => res.data)
