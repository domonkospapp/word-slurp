'use client'
import { signIn } from 'next-auth/react'
import Button from '../../ui/inputs/Button'

const LoginButton = () => {
  return (
    <Button
      color="bg-green-300"
      onClick={() => {
        signIn('google')
      }}
    >
      Login
    </Button>
  )
}
export default LoginButton
