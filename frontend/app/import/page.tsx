import { Suspense } from 'react'
import SelectedNativeLanguage from './components/selectNativeLanguage/SelectedNativeLanguage'
import CsvUploader from './components/csvUploader/csvUploader'

const ImportWords = async () => {
  return (
    <div>
      <p className="m-2 font-bold">Import your words from google translate!</p>
      <a
        className="m-2 underline"
        href="https://github.com/domonkospapp/word-learning-frontend/wiki/How-to-import-words-from-Google-Translate"
      >
        How can I import?
      </a>
      <div>
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <SelectedNativeLanguage />
        </Suspense>
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <CsvUploader />
        </Suspense>
      </div>
    </div>
  )
}
export default ImportWords
