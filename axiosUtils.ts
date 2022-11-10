import axios from 'axios'
import { getToken, GetTokenParams } from 'next-auth/jwt'

export const initAxiosAuthHeaderInterceptor = async ({
  req,
}: GetTokenParams) => {
  const token = await getToken({ req })
  if (token) {
    axios.interceptors.request.use((config) => {
      const authHeader = `Bearer ${token.id_token}`
      const additionalHeaders = {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      }
      if (config.headers) {
        config.headers = {
          ...config.headers,
          ...additionalHeaders,
        }
      } else {
        config.headers = additionalHeaders
      }
      return config
    })
  }
}
