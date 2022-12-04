import * as React from 'react'
import { GetServerSideProps } from 'next'
import { parseBody } from 'next/dist/server/api-utils/node'
import { getToken } from 'next-auth/jwt'
import SelectedNativeLanguage from '../../components/selectedNativeLanguage'
import { getUser, updateUser } from '../../userApi'
import { User } from '../../types/user'
import { getLanguages } from '../../languagesApi'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })
  if (req.method == 'PUT') {
    const body = await parseBody(req, '1mb')
    await updateUser(body, token?.idToken)
  }
  return {
    props: {
      user: await getUser(token?.idToken).catch(() => []),
      languages: await getLanguages(token?.idToken),
    },
  }
}

const ImportWords = ({
  user,
  languages,
}: {
  user: User
  languages: Array<string>
}) => {
  return (
    <div>
      <h2>Selected native language</h2>
      <SelectedNativeLanguage user={user} languages={languages} />
    </div>
  )
}
export default ImportWords
