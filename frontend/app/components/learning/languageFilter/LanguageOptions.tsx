import { LanguagePair } from '../../../../types/languagePair'
import { getUsedLanguages } from '../../../../utils/clients/wordSetApi'

const LanguageOptions = async () => {
  const languages: Array<LanguagePair> = await getUsedLanguages().catch(
    () => []
  )

  return (
    <>
      {languages.map((v, k) => (
        <option
          key={k}
          value={`ol=${v.originalLanguage}&fl=${v.foreignLanguage}`}
        >
          {v.originalLanguage} - {v.foreignLanguage}
        </option>
      ))}
    </>
  )
}

export default LanguageOptions
