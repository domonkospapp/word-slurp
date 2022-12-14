import { ReactNode } from 'react'
import Footer from '../components/footer'
import Navbar from './navbar'
import Providers from './providers'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
