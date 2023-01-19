import { ReactElement } from 'react'
import Footer from './footer'
import Navbar from '../app/components/navbar/Navbar'

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
