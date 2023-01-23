import { WordSet } from './word-set'

export interface Word {
  id: number
  original: string
  originalLanguage: string
  foreign: string
  foreignLanguage: string
  level: number
  wordSet: WordSet
}
