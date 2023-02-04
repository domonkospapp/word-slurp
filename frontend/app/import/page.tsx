import { Suspense } from 'react'
import CsvUploader from './components/csvUploader/CsvUploader'
import SelectedNativeLanguage from './components/selectNativeLanguage/SelectedNativeLanguage'

const ImportWords = async () => {
  return (
    <div>
      <h2 className="col-span-1 m-2 text-xl font-bold leading-10 ">
        Import your words from google translate!
      </h2>
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
