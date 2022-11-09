import * as React from 'react'
import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt'
import { FormData, Blob } from 'formdata-node'
import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

const FILE_UPLOAD_BASE_URL = `${process.env.BACKEND_BASE_URL}/words/translations`

const createBody = (file: string) => {
  const form = new FormData()
  const blob = new Blob([file], { type: 'text/csv' })
  form.set('translations', blob)
  return form
}

const createAuthHeader = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) => {
  const token = await getToken({ req })
  return {
    Authorization: `Bearer ${token?.id_token}`,
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.method == 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', async () => {
      await fetch(FILE_UPLOAD_BASE_URL, {
        method: 'POST',
        headers: await createAuthHeader(req),
        body: createBody(body),
      }).then((res) => console.log(res))
    })
    return {
      redirect: {
        permanent: false,
        destination: '/words',
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}

const ImportWords = () => {
  return (
    <div>
      <form action="/words/upload" method="POST" encType="multipart/form-data">
        <input type="file" id="myFile" name="filename" />
        <input type="submit" />
      </form>
    </div>
  )
}
export default ImportWords
