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
  response?: []
  data?: NextApiResponse
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
        const { videoId } = req.body

        if (videoId) {
          const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET as string
          )

          const userId = decodedToken.issuer

          const findVideo = await findVideoIdByUser(token, userId, videoId)
          const doesStatsExist = findVideo?.length > 0

          const { favorited, watched = true } = req.body

          if (doesStatsExist) {
            const response = await updateStats(token, {
              watched,
              userId,
              videoId,
              favorited,
            })
            res.send({ data: response })
          } else {
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favorited,
            })
            res.send({ data: response })
          }
        } else {
          res.status(500).send({ msg: 'VideoId is required' })
        }
      }
    } catch (error) {
      console.error('Error occurred in /stats', error)
      res.status(500).send({ done: false, error })
    }
  }
}
