import { ReactNode } from 'react'
import Footer from '../components/footer'
import Providers from './providers'
import './global.css'
import Navbar from './components/navbar/Navbar'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-stone-200 font-space text-stone-900">
        <Providers>
          <div className="mx-auto max-w-3xl sm:mt-6 sm:mb-6">
            <Navbar />
            <div className="border-stone-900 p-6 sm:border-b-4 sm:border-r-4 sm:border-l-4">
              {children}
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
