import type { NextApiRequest, NextApiResponse } from 'next'
import { createWord } from '../../../utils/clients/wordApi'
import { Word } from '../../../word'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Word>
) {
  if (req.method == 'POST') {
    const word = await createWord(req.body)
    res.status(200).json(word)
  }
  res.status(405)
}
