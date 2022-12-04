import { GetServerSideProps } from 'next'
import { createWord } from '../../wordApi'
import { parseBody } from 'next/dist/server/api-utils/node'
import { getToken } from 'next-auth/jwt'
import { getLanguages } from '../../languagesApi'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req })

  if (req.method == 'POST') {
    const body = await parseBody(req, '1mb')
    createWord(body, token?.idToken)
  }
  return {
    props: {
      languages: await getLanguages(token?.idToken),
    },
  }
}

const LanguageSelector = ({
  name,
  languages,
}: {
  name: string
  languages: Array<string>
}) => (
  <select name={name}>
    {languages &&
      languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
  </select>
)

const CreateWord = ({ languages }: { languages: Array<string> }) => {
  return (
    <div>
      <form action="/words/create" method="POST">
        Original word: <input type="text" name="original" />
        <br />
        Original language:
        <LanguageSelector name="originalLanguage" languages={languages} />
        <br />
        Foreign word: <input type="text" name="foreign" />
        <br />
        Foreign language:
        <LanguageSelector name="foreignLanguage" languages={languages} />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
export default CreateWord
