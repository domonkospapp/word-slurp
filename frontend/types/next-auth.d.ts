import { User } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
    accessTokenExpires: number
    accessToken: string
    refreshToken: string
    user: User
    error?: string
  }
}

declare module 'next-auth' {
  interface Account {
    refresh_token: string
    expires_at: number
    access_token: string
  }

  interface Session {
    error?: string
  }
}
