import type { NextApiRequest, NextApiResponse } from 'next'
import { updateWord } from '../../../utils/clients/wordApi'
import { Word } from '../../../word'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Word>
) {
  if (req.method == 'PUT') {
    console.log(req.body)
    const word = await updateWord(JSON.parse(req.body))
    res.status(200).json(word)
  }
  res.status(405)
}
