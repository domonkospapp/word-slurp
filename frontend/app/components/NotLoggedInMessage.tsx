import ImportButton from './ImportButton'

const NotLoggedInMessage = () => {
  return (
    <div>
      <div>
        <div className="flex">
          <div className="w-1/2">
            <h1 className="m-2 text-xl font-bold">Word Slurp</h1>
          </div>
          <div className="w-1/2 ">
            <p className="mt-3 mr-4 text-right text-red-400">
              You are not logged in!
            </p>
          </div>
        </div>

        <p className="m-2 mt-6 mb-6">
          The WordSlurp app is a tool for learning new words and expanding your
          vocabulary. With WordSlurp, you can import words from other
          applications, such as Google Translate, to create personalized word
          lists for study and practice.
        </p>
        <p className="m-2 font-bold">
          Start importing your words from google translate!
        </p>
        <div className="grid grid-cols-1 items-center justify-around text-center sm:grid-cols-2">
          <div>
            <ImportButton />
          </div>
          <a
            className="m-2  whitespace-nowrap underline"
            href="https://github.com/domonkospapp/word-learning-frontend/wiki/How-to-import-words-from-Google-Translate"
          >
            How can I import?
          </a>
        </div>
      </div>
    </div>
  )
}
export default NotLoggedInMessage
