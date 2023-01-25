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
        autoUpdate
        languages={languages}
        initialValue={user.nativeLanguage}
        update={updateNativeLanguage}
      />
    </Suspense>
  )
}
export default SelectedNativeLanguage
