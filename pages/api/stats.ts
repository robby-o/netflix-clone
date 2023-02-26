import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { findVideoIdByUser } from '../../lib/db/hasura'

export type Data = {
  done?: boolean
  msg?: string
  error?: string
  decoded?: any
}

export default async function stats(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token
      if (!token) {
        res.status(403).send({})
      } else {
        const videoId = req.query.videoId
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        )
        const userId = decodedToken.issuer

        const findVideoId = await findVideoIdByUser(token, userId, videoId)

        res.send({ msg: 'it works', decodedToken, findVideoId })
      }
    } catch (error) {
      console.error('Error occurred in /stats', error)
      res.status(500).send({ done: false, error })
    }
  }
}
