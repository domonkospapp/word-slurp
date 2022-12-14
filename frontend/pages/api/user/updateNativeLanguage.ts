import type { NextApiRequest, NextApiResponse } from 'next'
import { updateNativeLanguage } from '../../../utils/clients/userApi'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method == 'PUT') {
    const languageMapping = await updateNativeLanguage(req.body)
    res.status(200).json(languageMapping)
  }
  res.status(405)
}
