import type { NextApiRequest, NextApiResponse } from 'next'
import { importWords } from '../../../utils/clients/wordApi'
import { Word } from '../../../types/word'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Word>>
) {
  if (req.method == 'POST') {
    const wordList = await importWords(req.body)
    res.status(200).json(wordList)
  }
  res.status(405)
}
