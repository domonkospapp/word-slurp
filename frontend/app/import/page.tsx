import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import CsvUploader from './csvUploader'
import {
  getLanguages,
  getLanguagesMaping,
} from '../../utils/clients/languageApi'
import { getUser } from '../../utils/clients/userApi'
import { User } from '../../types/user'
import Link from 'next/link'
import SelectedNativeLanguage from '../../components/selectedNativeLanguage'

const ImportWords = async () => {
  const session = await unstable_getServerSession(authOptions)
  const languages: Array<string> = await getLanguages()
  const languageMapping: { [key: string]: string } = await getLanguagesMaping()
  const user: User = await getUser()

  return (
    <div>
      {session?.user ? (
        <div>
          {!user.nativeLanguage && (
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <h2>Selected native language</h2>
              </div>
              <div className="col-span-1">
                <SelectedNativeLanguage user={user} languages={languages} />
              </div>
            </div>
          )}
          <CsvUploader
            languages={languages}
            languageMapping={languageMapping}
          />
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <Link href="/api/auth/signin">Go to the login page</Link>
        </div>
      )}
    </div>
  )
}
export default ImportWords
