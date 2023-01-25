import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import { WordSet } from '../../../types/word-set'
import { getLanguages } from '../../../utils/clients/languageApi'
import { getWordSets } from '../../../utils/clients/wordSetApi'
import CreateWordForm from './components/CreateWordForm'

const CreateWord = async ({
  searchParams,
}: {
  searchParams?: { wordSetId?: number }
}) => {
  await unstable_getServerSession(authOptions)
  const languages: Array<string> = await getLanguages()
  const wordSets: [WordSet] = await getWordSets(undefined, undefined).catch(
    (e) => console.log(e)
  )

  return (
    <div>
      <span className="m-2 border-b-4 border-stone-900 text-2xl font-bold shadow-b-normal shadow-pink-200">
        Create word
      </span>
      <br />
      <br />
      <CreateWordForm
        languages={languages}
        wordSets={wordSets}
        initialWordSetId={searchParams?.wordSetId}
      />
    </div>
  )
}
export default CreateWord
