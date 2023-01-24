import ImportButton from './components/ImportButton'

const Home = () => {
  return (
    <div>
      <h1 className="m-2 text-xl font-bold">Word Slurp</h1>
      <p className="m-2">
        The WordSlurp app is a tool for learning new words and expanding your
        vocabulary. With WordSlurp, you can import words from other
        applications, such as Google Translate, to create personalized word
        lists for study and practice.
      </p>
      <p className="m-2 font-bold">
        Start importing your words from google translate!
      </p>
      <ImportButton />
      <a
        className="m-2 ml-10 underline"
        href="https://github.com/domonkospapp/word-learning-frontend/wiki/How-to-import-words-from-Google-Translate"
      >
        How can I import?
      </a>
    </div>
  )
}
export default Home
