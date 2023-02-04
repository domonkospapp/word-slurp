import { WordSet } from '../../../../types/word-set'
import { getWordSets } from '../../../../utils/clients/wordSetApi'

const SetFilterOptions = async () => {
  const wordSets: [WordSet] = await getWordSets(undefined, undefined, false)

  return (
    <>
      {wordSets.map((wordSet, index) => (
        <option key={index} value={wordSet.id}>
          {wordSet.name}
        </option>
      ))}
    </>
  )
}

export default SetFilterOptions
