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
  user?: [] | null
}

type JwtPayload = {
  issuer: string
}

export default async function stats(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const token = req.cookies.token
    if (!token) {
      res.status(403).send({})
    } else {
      const inputParams = req.method === 'POST' ? req.body : req.query
      const { videoId } = inputParams

      if (videoId) {
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload

        const userId = decodedToken.issuer
        const findVideo = await findVideoIdByUser(token, userId, videoId)
        const doesStatsExist = findVideo?.length > 0

        if (req.method === 'POST') {
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
            console.log({ watched, userId, videoId, favorited })
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favorited,
            })
            res.send({ data: response })
          }

          // GET request
        } else {
          if (doesStatsExist) {
            res.send(findVideo)
          } else {
            res.status(404)
            res.send({ user: null, msg: 'Video not found' })
          }
        }
      }
    }
  } catch (error) {
    console.error('Error occured in /stats', error)
    res.status(500).send({ done: false, error })
  }
}
