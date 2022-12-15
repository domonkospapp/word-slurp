'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <>
      <Link href="/words" prefetch={false}>
        My words
      </Link>{' '}
      |
      <Link href="/learning" prefetch={false}>
        Learning
      </Link>{' '}
      |
      <Link href="/words/import" prefetch={false}>
        Import words
      </Link>{' '}
      |
      {session?.user ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <button onClick={() => signIn('google')}>Login</button>
      )}
      <hr />
    </>
  )
}

export default Navbar
