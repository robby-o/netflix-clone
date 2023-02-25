import { magicAdmin } from '@/lib/magic-server'
import jwt from 'jsonwebtoken'
import { isNewUser } from '../../lib/db/hasura'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  done: Boolean
  isNewUserQuery: any
}

type JWT_SECRET = {
  JWT_SECRET: string
}

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization
      const didToken = auth ? auth.substring(7) : ''

      const metadata = await magicAdmin.users.getMetadataByToken(didToken)

      // create jwt
      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET as any
      )

      // CHECK IF USER EXISTS
      const isNewUserQuery = await isNewUser(token, metadata.issuer)
      res.send({ done: true, isNewUserQuery })
    } catch (error) {
      console.error('Something went wrong logging in', error)
      res.status(500).send({ done: false, isNewUserQuery: '' })
    }
  } else {
    res.send({ done: false, isNewUserQuery: '' })
  }
}
