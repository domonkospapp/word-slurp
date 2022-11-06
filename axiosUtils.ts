import axios from 'axios'
import { getToken, GetTokenParams } from 'next-auth/jwt'

export const initAxiosAuthHeaderInterceptor = async ({
  req,
}: GetTokenParams) => {
  const token = await getToken({ req })
  if (token) {
    axios.interceptors.request.use((config) => {
      const authHeader = `Bearer ${token.id_token}`
      if (config.headers) {
        config.headers.Authorization = authHeader
      } else {
        config.headers = {
          Authorization: authHeader,
        }
      }
      return config
    })
  }
}
