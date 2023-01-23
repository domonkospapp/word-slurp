import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import { WordSet } from '../../../types/word-set'
import { getLanguages } from '../../../utils/clients/languageApi'
import { getWordSets } from '../../../utils/clients/wordSetApi'
import CreateWordForm from './components/CreateWordForm'

const CreateWord = async () => {
  await unstable_getServerSession(authOptions)
  const languages: Array<string> = await getLanguages()
  const wordSets: [WordSet] = await getWordSets(undefined, undefined).catch(
    (e) => console.log(e)
  )

  return (
    <div>
      <CreateWordForm languages={languages} wordSets={wordSets} />
    </div>
  )
}
export default CreateWord
