import axios from 'axios'
import { ChangeEvent, Suspense, useState } from 'react'
import { User } from '../types/user'

const SelectedNativeLanguage = ({ user }: { user: User }) => {
  const [nativeLanguage, setNativeLanguage] = useState<string>(
    user.nativeLanguage || ''
  )

  const updateNativeLanguage = () => {
    axios.put('/words/import', { nativeLanguage: nativeLanguage })
  }

  const upfateNativeLanguageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNativeLanguage(e.target.value)
  }

  return (
    <Suspense fallback="Loading language...">
      {user.nativeLanguage || 'No native language selected'}
      <br />
      Update native language:
      <input
        type="text"
        value={nativeLanguage}
        onChange={upfateNativeLanguageInput}
      />
      <button onClick={updateNativeLanguage}>Update</button>
    </Suspense>
  )
}
export default SelectedNativeLanguage
