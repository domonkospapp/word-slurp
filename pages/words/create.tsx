import { GetServerSideProps } from 'next'
import { createWord } from '../../wordApi'
import { parseBody } from 'next/dist/server/api-utils/node'
import { initAxiosAuthHeaderInterceptor } from '../../axiosUtils'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.method == 'POST') {
    const body = await parseBody(req, '1mb')
    await initAxiosAuthHeaderInterceptor({ req })
    createWord(body)
  }
  return { props: {} }
}

const CreateWord = () => {
  return (
    <div>
      <form action="/words/create" method="POST">
        Original: <input type="text" name="original" />
        Foreign: <input type="text" name="foreign" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
export default CreateWord
