import axios from 'axios'

const BASE_URL_USERS = process.env.BACKEND_BASE_URL + '/users'

const withHeader = (token: string | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
}

export const createUser = (token: string | undefined) =>
  axios.post(BASE_URL_USERS, {}, withHeader(token)).then((res) => res.data)
