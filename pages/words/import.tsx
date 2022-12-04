import { GetServerSideProps } from 'next'
import { ChangeEvent, useState } from 'react'
import { parseBody } from 'next/dist/server/api-utils/node'
import { importWords } from '../../wordApi'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getToken } from 'next-auth/jwt'
import { getUser } from '../../userApi'
import { User } from '../../types/user'
import {
  addLanguageMaping,
  getLanguages,
  getLanguagesMaping,
} from '../../languagesApi'
import LanguageMappings from '../../components/languageMappings/LanguageMappings'
import MissingLanguageMappings from '../../components/languageMappings/MissingLanguageMappings'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })
  if (req.method == 'POST') {
    const body = await parseBody(req, '1mb')
    importWords(body.csv, token?.idToken)
  }
  if (req.method == 'PUT') {
    const body = await parseBody(req, '1mb')
    await addLanguageMaping(body.language, body.isoLanguage, token?.idToken)
  }
  return {
    props: {
      user: await getUser(token?.idToken).catch(() => []),
      languages: await getLanguages(token?.idToken).catch(() => []),
      languageMapping: await getLanguagesMaping(token?.idToken).catch(() => []),
    },
  }
}

const ImportWords = ({
  user,
  languages,
  languageMapping,
}: {
  user: User
  languages: Array<string>
  languageMapping: { [key: string]: string }
}) => {
  const session = useSession()
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
      selectedFile.text().then((content) => {
        console.log('local')
        console.log(content)
        axios
          .post('/words/import', { csv: content })
          .then(() => router.push('/words'))
      })
    }
  }

  return (
    <div>
      {session.data ? (
        <>
          <h2>Selected native language</h2>
          <p>
            Native language:{' '}
            {user.nativeLanguage || 'No native language selected'}
          </p>
          <button onClick={() => router.push('/user/nativeLanguage')}>
            Change it!
          </button>
          <h2>Select CSV file</h2>
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
      ) : (
        <div>
          <p>You are not logged in</p>
          <Link href="/login">Go to the login page</Link>
        </div>
      )}
    </div>
  )
}
export default ImportWords
