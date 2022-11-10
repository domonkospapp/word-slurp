import axios from 'axios'
import { getToken, GetTokenParams, JWT } from 'next-auth/jwt'

export const initAxiosAuthHeaderInterceptor = async ({
  req,
}: GetTokenParams) => {
  const token: JWT | null = await getToken({ req })
  if (token && token.id_token && typeof token.id_token == 'string') {
    initHeaders(token.id_token)
  }
}

export const initAxiosAuthHeaderInterceptorWithToken = async (
  token: string | undefined
) => {
  if (token) {
    initHeaders(token)
  }
}

const initHeaders = (token: string) => {
  return axios.interceptors.request.use((config) => {
    const authHeader = `Bearer ${token}`
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
