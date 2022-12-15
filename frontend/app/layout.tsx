import { ReactNode } from 'react'
import Footer from '../components/footer'
import { AnalyticsWrapper } from './components/analytics'
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
        <AnalyticsWrapper />
      </body>
    </html>
  )
}

export default RootLayout
