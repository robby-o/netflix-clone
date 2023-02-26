import { verifyToken } from '@/lib/utils'
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
        const userId = await verifyToken(token)

        const findVideo = await findVideoIdByUser(token, userId, videoId)
        const doesStatsExist = findVideo?.length > 0

        switch (req.method) {
          case 'POST':
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
            break
          case 'GET':
            if (doesStatsExist) {
              res.send(findVideo)
            } else {
              res.status(404)
              res.send({ user: null, msg: 'Video not found' })
            }
            break

          default:
            res.send({ msg: 'Request method not available' })
            break
        }
      }
    }
  } catch (error) {
    console.error('Error occured in /stats', error)
    res.status(500).send({ done: false, error })
  }
}
