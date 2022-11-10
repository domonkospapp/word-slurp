import axios from 'axios'

const BASE_URL_USERS = process.env.BACKEND_BASE_URL + '/users'

export const createUser = () =>
  axios.post(BASE_URL_USERS).then((res) => res.data)
