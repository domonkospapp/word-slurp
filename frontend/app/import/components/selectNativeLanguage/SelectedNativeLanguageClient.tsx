'use client'

import LanguageSelection from '../../../../components/languageSelection'
import { User } from '../../../../types/user'

const SelectNativeLanguageClient = ({
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
    <LanguageSelection
      autoUpdate
      languages={languages}
      initialValue={user.nativeLanguage}
      update={updateNativeLanguage}
    />
  )
}
export default SelectNativeLanguageClient
