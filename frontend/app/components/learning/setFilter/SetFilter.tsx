import { WordSet } from '../../../../types/word-set'
import { Option } from '../../../../ui/inputs/select/Select'
import { getWordSets } from '../../../../utils/clients/wordSetApi'
import SetFilterClient from './SetFilterClient'

const SetFilter = async () => {
  const wordSets: Array<WordSet> = await getWordSets(
    undefined,
    undefined,
    false
  )

  const options: Array<Option> = wordSets.map(({ id, name }) => {
    return {
      text: name,
      value: id.toString(),
    }
  })

  options.unshift({
    text: 'all',
    value: '',
  })

  return <SetFilterClient setOptions={options} />
}

export default SetFilter
