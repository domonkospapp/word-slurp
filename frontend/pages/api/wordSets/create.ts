import type { NextApiRequest, NextApiResponse } from 'next'
import { WordSet } from '../../../types/word-set'
import { createWordSet } from '../../../utils/clients/wordSetApi'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WordSet>
) {
  if (req.method == 'POST') {
    const word = await createWordSet(req.body)
    res.status(200).json(word)
  }
  res.status(405)
}
