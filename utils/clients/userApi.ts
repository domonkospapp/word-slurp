import axios from 'axios'

const userBaseUrl = process.env.BACKEND_BASE_URL + '/users'

export const getUser = () => axios.get(userBaseUrl).then((res) => res.data)

export const updateNativeLanguage = (language: string) =>
  axios.put(userBaseUrl, { nativeLanguage: language }).then((res) => res.data)
