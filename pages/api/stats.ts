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
        const { videoId, favorited, watched = true } = req.body

        if (videoId) {
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
            const response = await updateStats(token, {
              watched,
              userId,
              videoId,
              favorited,
            })
            res.send({ msg: 'it works', response })
          } else {
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favorited,
            })
            res.send({ msg: 'it works', response })
          }
        }
      }
    } catch (error) {
      console.error('Error occurred in /stats', error)
      res.status(500).send({ done: false, error })
    }
  }
}
