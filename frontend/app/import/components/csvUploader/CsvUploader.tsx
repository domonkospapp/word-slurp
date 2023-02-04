import {
  getLanguages,
  getLanguagesMaping,
} from '../../../../utils/clients/languageApi'
import CsvUploaderClient from './CsvUploaderClient'

const CsvUploader = async () => {
  const languages: Array<string> = await getLanguages()
  const languageMapping: { [key: string]: string } = await getLanguagesMaping()

  return (
    <CsvUploaderClient
      languages={languages}
      languageMapping={languageMapping}
    />
  )
}
export default CsvUploader
