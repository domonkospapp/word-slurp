import axios from 'axios'

const BASE_URL_USERS = process.env.BACKEND_BASE_URL + '/languages'

const withHeader = (token: string | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
}

export const getLanguages = (token: string | undefined) =>
  axios.get(BASE_URL_USERS, withHeader(token)).then((res) => res.data)
