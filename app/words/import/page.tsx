import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import CsvUploader from './csvUploader'
import {
  getLanguages,
  getLanguagesMaping,
} from '../../../utils/clients/languageApi'
import { getUser } from '../../../utils/clients/userApi'
import { User } from '../../../types/user'
import Link from 'next/link'

const ImportWords = async () => {
  const session = await unstable_getServerSession(authOptions)
  const languages: Array<string> = await getLanguages()
  const languageMapping: { [key: string]: string } = await getLanguagesMaping()
  const user: User = await getUser()

  return (
    <div>
      {session?.user ? (
        <>
          <h2>Selected native language</h2>
          <p>
            Native language:{' '}
            {user.nativeLanguage || 'No native language selected'}
          </p>
          {/*<button onClick={() => router.push('/user/nativeLanguage')}>
            Change it!
          </button>
          <Link href="/user/nativeLanguage">Change it!</Link>*/}

          <h2>Select CSV file</h2>
          <CsvUploader
            languages={languages}
            languageMapping={languageMapping}
          />
        </>
      ) : (
        <div>
          <p>You are not logged in</p>
          <Link href="/login">Go to the login page</Link>
        </div>
      )}
    </div>
  )
}
export default ImportWords
