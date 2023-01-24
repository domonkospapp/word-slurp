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

  return (
    <div>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <span className="ml-2">{currentWord?.wordSet.originalLanguage}</span>
        <div className="m-2 border-4 border-stone-900 bg-stone-200 p-12 text-stone-900 placeholder-stone-600 shadow-normal shadow-pink-200">
          {currentWord?.original}
        </div>
        <span className="ml-2 mt-4">
          {currentWord?.wordSet.foreignLanguage}
        </span>
        {waitingForAnswer ? (
          <>
            <div className="mr-4">
              <Input fullWidth value={answer} onChange={updateAnswer} />
            </div>
            <div className="grid grid-cols-2">
              <Button color="bg-pink-200" onClick={evaulate}>
                Don&apos;t know
              </Button>
              <Button color="bg-green-300" onClick={evaulate}>
                Submit
              </Button>
            </div>
          </>
        ) : (
          <div>
            <div className="ml-2 mt-5 mb-5 font-bold">
              <span>
                {isAnswerCorrect()
                  ? `Correct! (${currentWord?.foreign})`
                  : `Correct is: ${currentWord?.foreign}`}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <Button color="bg-violet-200" onClick={playPronunciation}>
                Pronunce it!
              </Button>
              <Button color="bg-green-300" onClick={getNextWord}>
                Next word
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default WordLearningInput
