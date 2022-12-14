import type { NextApiRequest, NextApiResponse } from 'next'
import { LanguagePair } from '../../../types/languagePair'
import { addLanguageMaping } from '../../../utils/clients/languageApi'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LanguagePair>
) {
  if (req.method == 'POST') {
    const languageMapping = await addLanguageMaping(req.body)
    res.status(200).json(languageMapping)
  }
  res.status(405)
}
