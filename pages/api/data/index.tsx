import type { NextApiResponse } from 'next'
import axios from 'axios'

async function handler(
  res: NextApiResponse
) {
    res.status(200).json({ message: 'made it to the api!' })
}

export default handler