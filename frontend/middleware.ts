export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/learning', '/words/import', '/words/create'],
}
