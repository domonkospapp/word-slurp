import { WordSet } from './word-set'

export interface Word {
  id: number
  original: string
  foreign: string
  level: number
  wordSet: WordSet
}
