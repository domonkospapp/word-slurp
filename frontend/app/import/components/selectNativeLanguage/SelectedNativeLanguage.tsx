import { User } from '../../../../types/user'
import { getUser } from '../../../../utils/clients/userApi'
import { Suspense } from 'react'
import { getLanguages } from '../../../../utils/clients/languageApi'
import SelectNativeLanguageClient from './SelectedNativeLanguageClient'

const SelectNativeLanguage = async () => {
  const languages: Array<string> = await getLanguages()
  const user: User = await getUser()

  return user.nativeLanguage ? (
    <div></div>
  ) : (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <h2>Selected native language</h2>
      </div>
      <div className="col-span-1">
        <Suspense>
          <SelectNativeLanguageClient user={user} languages={languages} />
        </Suspense>
      </div>
    </div>
  )
}
export default SelectNativeLanguage
