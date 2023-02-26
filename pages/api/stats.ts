import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from '../../lib/db/hasura'

export type Data = {
  done?: boolean
  msg?: string
  error?: string | unknown
  decodedToken?: string | jwt.JwtPayload
  doesStatsExist?: boolean
  response?: []
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

        const doesStatsExist = await findVideoIdByUser(
          token,
          userId,
          videoId
        )
        if (doesStatsExist) {
          // update it
          const response = await updateStats(token, {
            watched: true,
            userId,
            videoId,
            favorited: 0,
          })
          res.send({ msg: 'it works', response })
        } else {
          // add it
          const response = await insertStats(token, {
            watched: false,
            userId,
            videoId,
            favorited: 0,
          })
          res.send({ msg: 'it works', response })
        }
      }
    } catch (error) {
      console.error('Error occurred in /stats', error)
      res.status(500).send({ done: false, error })
    }
  }
}
