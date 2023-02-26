import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

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
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        console.log({ decoded })
        res.send({ msg: 'it works', decoded })
      }
    } catch (error) {
      console.error('Error occurred in /stats', error)
      res.status(500).send({ done: false, error: error?.message })
    }
  }
}
