import * as React from 'react'
import { GetServerSideProps } from 'next'
import { ChangeEvent, useState } from 'react'
import { parseBody } from 'next/dist/server/api-utils/node'
import { importWords } from '../../wordApi'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getToken } from 'next-auth/jwt'
import SelectedNativeLanguage from '../../components/selectedNativeLanguage'
import { getUser, updateUser } from '../../userApi'
import { User } from '../../types/user'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })
  if (req.method == 'POST') {
    const body = await parseBody(req, '1mb')
    importWords(body.csv, token?.idToken)
  }
  if (req.method == 'PUT') {
    const body = await parseBody(req, '1mb')
    await updateUser(body, token?.idToken)
  }
  return {
    props: {
      user: await getUser(token?.idToken).catch(() => []),
    },
  }
}

const ImportWords = ({ user }: { user: User }) => {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File>()
  const [error, setError] = useState<string>()

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file: File = event.target.files[0]
      if (file.type != 'text/csv') {
        setError('Not supported file format, please pload a CSV!')
      } else {
        setSelectedFile(file)
        file.text().then((content) => {
          console.log('local')
          console.log(content)
          axios
            .post('/words/import', { csv: content })
            .then(() => router.push('/words'))
        })
      }
    }
  }

  return (
    <div>
      <SelectedNativeLanguage user={user} />
      <br />
      <input type="file" name="file" onChange={changeHandler} />
      {selectedFile && !error ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
        </div>
      ) : (
        <p>Select an exported Google Translate csv file to import words</p>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}
export default ImportWords
