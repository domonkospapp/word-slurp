'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { Word } from '../types/word'
import Button from '../ui/inputs/Button'
import Input from '../ui/inputs/Input'

const WordLearningInput = ({ words }: { words: Array<Word> }) => {
  const pickRandom = (): Word => {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
  }

  const [currentWord, setCurrentWord] = useState<Word | undefined>()
  const [answer, setAnswer] = useState('')
  const [waitingForAnswer, setWaitingForAnswer] = useState(true)

  useEffect(() => {
    getNextWord()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words])

  const updateAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }

  const levelUp = (word: Word) => {
    word.level = word.level + 1
    updateWord(word)
  }

  const levelDown = (word: Word) => {
    word.level = word.level - 1
    updateWord(word)
  }

  const updateWord = (word: Word) => {
    fetch('/api/words/update', {
      method: 'PUT',
      body: JSON.stringify(word),
    })
  }

  const evaulate = () => {
    if (currentWord) {
      if (isAnswerCorrect()) {
        levelUp(currentWord)
      } else {
        levelDown(currentWord)
      }
      setWaitingForAnswer(false)
    }
  }

  const getNextWord = () => {
    setAnswer('')
    setCurrentWord(pickRandom)
    setWaitingForAnswer(true)
  }

  const isAnswerCorrect = () => {
    return answer.toLowerCase() == currentWord?.foreign?.toLowerCase()
  }

  const playPronunciation = () => {
    const msg = new SpeechSynthesisUtterance(currentWord?.foreign)
    window.speechSynthesis.speak(msg)
  }

  return waitingForAnswer ? (
    <div>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="m-2 border-4 border-stone-900 bg-stone-200 p-12 text-stone-900 placeholder-stone-600 shadow-normal shadow-pink-200">
          {currentWord?.original}
        </div>
        <div>
          <span className="ml-2">Foreign:</span>
          <Input value={answer} onChange={updateAnswer} />
          <br />
          <Button color="bg-violet-300" onClick={evaulate}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>
        {isAnswerCorrect() ? 'Correct!' : `Correct is: ${currentWord?.foreign}`}
      </p>

      <button onClick={playPronunciation}>Pronunce it!</button>
      <br />
      <button onClick={getNextWord}>Next word</button>
    </div>
  )
}
export default WordLearningInput
