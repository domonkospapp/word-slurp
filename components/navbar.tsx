import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => (
  <>
    <Link href="/words">My words</Link> |<Link href="learning">Learning</Link> |
    <Link href="/words/upload">Import words</Link> |
    <button onClick={() => signIn('google')}>Login</button>
    <button onClick={() => signOut()}>Logout</button>
    <hr />
  </>
)
export default Navbar
