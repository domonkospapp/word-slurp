'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import LanguageMappings from '../../../components/languageMappings/LanguageMappings'
import MissingLanguageMappings from '../../../components/languageMappings/MissingLanguageMappings'

const CsvUploader = ({
  languages,
  languageMapping,
}: {
  languages: Array<string>
  languageMapping: { [key: string]: string }
}) => {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File>()
  const [error, setError] = useState<string>()
  const [containedLanguages, setContainedLanguages] = useState<Array<string>>(
    []
  )

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file: File = event.target.files[0]
      if (file.type != 'text/csv') {
        setError('Not supported file format, please pload a CSV!')
      } else {
        setSelectedFile(file)
        updateContainedLanguages(file)
      }
    }
  }

  const updateContainedLanguages = async (file: File) => {
    file
      .text()
      .then((text) =>
        text
          .split('\r\n')
          .map((line) => {
            const lineArray = line.split(',')
            return [lineArray[0], lineArray[1]]
          })
          .flat()
      )
      .then((languages) =>
        [...new Set(languages)].filter((lang) => lang && lang != '')
      )
      .then((distinctLanguages) => setContainedLanguages(distinctLanguages))
  }

  const uploadWords = () => {
    if (selectedFile) {
      selectedFile.text().then(async (content) => {
        fetch('/api/words/import', {
          method: 'POST',
          body: content,
        }).then(() => router.push('/words'))
      })
    }
  }

  return (
    <>
      <input type="file" name="file" onChange={changeHandler} />
      {selectedFile && !error ? (
        <div>
          <LanguageMappings mappings={languageMapping} />
          <MissingLanguageMappings
            mappings={languageMapping}
            languages={languages}
            containedLanguages={containedLanguages}
          />
          <h2>File details</h2>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <button onClick={uploadWords}>Upload words!</button>
        </div>
      ) : (
        <p>Select an exported Google Translate csv file to import words</p>
      )}
      {error && <p>{error}</p>}
    </>
  )
}
export default CsvUploader
