import { Word } from './word'

export interface WordSet {
  id: number
  name: string
  originalLanguage: string
  foreignLanguage: string
  private: boolean
  words: Array<Word>
}
