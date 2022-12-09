import axios from 'axios'

const userBaseUrl = process.env.BACKEND_BASE_URL + '/users'

export const getUser = () => axios.get(userBaseUrl).then((res) => res.data)
