import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { refreshAccessToken } from '../../../utils/auth/refreshToken'
import { createUser } from '../../../utils/clients/userApi'

const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  })

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          idToken: account.id_token,
          user,
        }
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }
      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token.user
      session.error = token.error
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.idToken}`
      return session
    },
    async signIn({ account }) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${account?.id_token}`
      createUser()
      return true
    },
  },
}

export default NextAuth(authOptions)
