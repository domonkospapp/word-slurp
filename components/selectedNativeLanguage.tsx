import axios from 'axios'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import { User } from '../types/user'
import LanguageSelection from './languageSelection'

const SelectedNativeLanguage = ({
  user,
  languages,
}: {
  user: User
  languages: Array<string>
}) => {
  const router = useRouter()

  const updateNativeLanguage = (lang: string) => {
    console.log(lang)
    axios
      .put('/user/nativeLanguage', { nativeLanguage: lang })
      .then(() => router.push('/words/import'))
  }

  return (
    <Suspense fallback="Loading language...">
      <LanguageSelection
        languages={languages}
        initialValue={user.nativeLanguage}
        update={updateNativeLanguage}
      />
      {user.nativeLanguage || 'No native language selected'}
      <br />
    </Suspense>
  )
}
export default SelectedNativeLanguage
