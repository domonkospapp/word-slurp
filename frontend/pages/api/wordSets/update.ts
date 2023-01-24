import type { NextApiRequest, NextApiResponse } from 'next'
import { WordSet } from '../../../types/word-set'
import { updateWordSet } from '../../../utils/clients/wordSetApi'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WordSet>
) {
  if (req.method == 'PUT') {
    const wordSet = await updateWordSet(JSON.parse(req.body))
    res.status(200).json(wordSet)
  }
  res.status(405)
}
