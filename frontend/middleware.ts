export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/learning', '/import', '/words/create'],
}
