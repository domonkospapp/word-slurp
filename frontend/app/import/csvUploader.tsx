'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import MissingLanguageMappings from '../../components/languageMappings/MissingLanguageMappings'
import Button from '../../ui/inputs/Button'

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
      <div className="mt-2">
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          className="file:m-2 file:mr-6 file:border-4 file:border-stone-900 file:bg-violet-300 file:p-1 file:shadow-normal file:shadow-stone-900"
        />
      </div>
      {selectedFile && !error && (
        <div>
          {
            //<LanguageMappings mappings={languageMapping} />
          }
          <MissingLanguageMappings
            mappings={languageMapping}
            languages={languages}
            containedLanguages={containedLanguages}
          />
          <div className="mt-4 w-full text-center">
            <Button color="bg-green-300" onClick={uploadWords}>
              Upload words!
            </Button>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  )
}
export default CsvUploader
