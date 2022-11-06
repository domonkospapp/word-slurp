import { ReactElement } from 'react'
import Footer from './footer'
import Navbar from './navbar'

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
