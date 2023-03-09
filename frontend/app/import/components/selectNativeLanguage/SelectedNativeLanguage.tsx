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
    <div>
      <span className="ml-2 border-b-4 border-stone-900 text-xl font-bold leading-10 shadow-b-normal shadow-pink-200">
        Select a native language
      </span>
      <div className="grid grid-cols-2 items-center">
        <div className="col-span-1 ml-2">
          <span>Native language</span>
        </div>
        <div className="col-span-1">
          <div className="sm:grid sm:grid-cols-2">
            <Suspense>
              <SelectNativeLanguageClient user={user} languages={languages} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SelectNativeLanguage
