'use client'

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
  const updateNativeLanguage = (lang: string) => {
    fetch('/api/user/updateNativeLanguage', {
      method: 'PUT',
      body: lang,
    })
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
