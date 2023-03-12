import { ReactNode } from 'react'
import Footer from './components/common/Footer'
import Providers from './providers'
import './global.css'
import Navbar from './components/navbar/Navbar'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import NotLoggedInMessage from './components/NotLoggedInMessage'
import localFont from '@next/font/local'

const spaceMono = localFont({
  src: [
    {
      path: './fonts/SpaceMono-Regular.ttf',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './fonts/SpaceMono-Bold.ttf',
      weight: 'bold',
      style: 'normal',
    },
  ],
  variable: '--font-space',
  display: 'swap',
})

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await unstable_getServerSession(authOptions)
  const loggedIn: boolean = session ? session.user != null : false

  return (
    <html lang="en" className={spaceMono.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="The WordSlurp app is a tool for learning new words and expanding your vocabulary. With WordSlurp, you can import words from other applications, such as Google Translate, to create personalized word lists for study and practice."
        />
      </head>
      <body className="bg-stone-200 font-space text-stone-900">
        <Providers>
          <div className="mx-auto max-w-3xl sm:mt-6 sm:mb-6">
            <Navbar loggedIn={loggedIn} />
            <div className="border-stone-900 p-2 sm:border-b-4 sm:border-r-4 sm:border-l-4">
              {loggedIn ? children : <NotLoggedInMessage />}
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
