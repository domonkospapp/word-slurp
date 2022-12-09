import axios from 'axios'
import { User } from './types/user'

const BASE_URL_USERS = process.env.BACKEND_BASE_URL + '/users'

const withHeader = (token: string | undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
}

export const getUser = (token: string | undefined) =>
  axios.get(BASE_URL_USERS, withHeader(token)).then((res) => res.data)

export const createUser = (token: string | undefined) =>
  axios.post(BASE_URL_USERS, {}, withHeader(token)).then((res) => res.data)

export const updateUser = (user: User, token: string | undefined) =>
  axios
    .put(
      BASE_URL_USERS,
      {
        nativeLanguage: user.nativeLanguage,
      },
      withHeader(token)
    )
    .then((res) => res.data)
