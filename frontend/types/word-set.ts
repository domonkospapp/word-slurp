import { Word } from './word'

export interface WordSet {
  id: number
  name: string
  originalLanguage: string
  foreignLanguage: string
  isPublic: boolean
  words: Array<Word>
}
