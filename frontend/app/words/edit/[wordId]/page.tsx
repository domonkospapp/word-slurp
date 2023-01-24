import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'
import { Word } from '../../../../types/word'
import { WordSet } from '../../../../types/word-set'
import { getLanguages } from '../../../../utils/clients/languageApi'
import { getWord } from '../../../../utils/clients/wordApi'
import { getWordSets } from '../../../../utils/clients/wordSetApi'
import EditWordForm from './components/EditWordForm'

const CreateWordPage = async ({ params }: { params: { wordId: number } }) => {
  await unstable_getServerSession(authOptions)
  const languages: Array<string> = await getLanguages()
  const wordSets: [WordSet] = await getWordSets(undefined, undefined).catch(
    (e) => console.log(e)
  )

  const word: Word = await getWord(params.wordId)

  return (
    <div>
      <div className="mb-8 p-2">
        <span className="border-b-4 border-stone-900 text-2xl font-bold shadow-b-normal shadow-pink-200">
          Edit word
        </span>
      </div>
      <EditWordForm word={word} languages={languages} wordSets={wordSets} />
    </div>
  )
}
export default CreateWordPage
