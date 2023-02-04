'use client'

import { useEffect } from 'react'
import Button from '../ui/inputs/Button'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2 className="ml-2 border-b-4 border-stone-900 text-xl font-bold leading-10 shadow-b-normal shadow-pink-200">
        Something went wrong!
      </h2>
      <p className="m-6 ml-2">
        Maybe the backend is not ready. (Needs 15 sec to boot)
        <br />
        <b>Try to refresh the page or log in and out</b>!
        <br />
        (Better error messages in development...)
      </p>
      <Button color="bg-green-300" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
export default Error
