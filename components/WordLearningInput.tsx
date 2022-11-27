import { ChangeEvent, useEffect, useState } from 'react'
import { Word } from '../word'

const WordLearningInput = ({
  words,
  levelUp,
  levelDown,
}: {
  words: Array<Word>
  levelUp: (word: Word) => void
  levelDown: (word: Word) => void
}) => {
  const pickRandom = (): Word => {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
  }

  const [currentWord, setCurrentWord] = useState<Word>(pickRandom())
  const [answer, setAnswer] = useState('')
  const [waitingForAnswer, setWaitingForAnswer] = useState(true)

  useEffect(() => {
    getNextWord()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words])

  const updateAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }

  const evaulate = () => {
    if (isAnswerCorrect()) {
      levelUp(currentWord)
    } else {
      levelDown(currentWord)
    }
    setWaitingForAnswer(false)
  }

  const getNextWord = () => {
    setAnswer('')
    setCurrentWord(pickRandom)
    setWaitingForAnswer(true)
  }

  const isAnswerCorrect = () => {
    return answer.toLowerCase() == currentWord.foreign?.toLowerCase()
  }

  const playPronunciation = () => {
    const msg = new SpeechSynthesisUtterance(currentWord.foreign)
    window.speechSynthesis.speak(msg)
  }

  return waitingForAnswer ? (
    <div>
      Word: {currentWord?.original}
      <br />
      Foreign: <input type="text" value={answer} onChange={updateAnswer} />
      <button onClick={evaulate}>Submit</button>
    </div>
  ) : (
    <div>
      <p>
        {isAnswerCorrect() ? 'Correct!' : `Correct is: ${currentWord.foreign}`}
      </p>

      <button onClick={playPronunciation}>Pronunce it!</button>
      <br />
      <button onClick={getNextWord}>Next word</button>
    </div>
  )
}
export default WordLearningInput
