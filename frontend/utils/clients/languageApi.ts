import axios from 'axios'

const languagesBaseUrl = process.env.BACKEND_BASE_URL + '/languages'
const languagesMappingBaseUrl = process.env.BACKEND_BASE_URL + '/languageMap'

export const getLanguages = () =>
  axios.get(languagesBaseUrl).then((res) => res.data)

export const getLanguagesMaping = () =>
  axios.get(languagesMappingBaseUrl).then((res) => res.data)

export const addLanguageMaping = (l: {
  language: string
  isoLanguage: string
}) =>
  axios
    .post(languagesMappingBaseUrl, l, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)
