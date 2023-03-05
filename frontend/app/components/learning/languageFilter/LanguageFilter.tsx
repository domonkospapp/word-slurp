import { LanguagePair } from '../../../../types/languagePair'
import { Option } from '../../../../ui/inputs/select/Select'
import { getUsedLanguages } from '../../../../utils/clients/wordSetApi'
import LanguageFilterClient from './LanguageFilterClient'

const LanguageFilter = async () => {
  const languages: Array<LanguagePair> = await getUsedLanguages()

  const options: Array<Option> = languages.map(
    ({ originalLanguage, foreignLanguage }) => {
      return {
        text: `${originalLanguage} - ${foreignLanguage}`,
        value: `ol=${originalLanguage}&fl=${foreignLanguage}`,
      }
    }
  )

  options.unshift({
    text: 'all',
    value: '',
  })

  return <LanguageFilterClient languageOptions={options} />
}

export default LanguageFilter
