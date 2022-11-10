import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { initAxiosAuthHeaderInterceptorWithToken } from '../../../axiosUtils'
import { createUser } from '../../../userApi'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token
      }
      return token
    },
    async signIn({ account }) {
      initAxiosAuthHeaderInterceptorWithToken(account?.id_token)
      createUser()
      return true
    },
  },
}

export default NextAuth(authOptions)
