import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import { getLanguages } from '../../../utils/clients/languageApi'
import CreateWordForm from './components/CreateWordForm'

const CreateWord = async () => {
  await unstable_getServerSession(authOptions)
  const languages: Array<string> = await getLanguages()
  return (
    <div>
      <CreateWordForm languages={languages} />
    </div>
  )
}
export default CreateWord
