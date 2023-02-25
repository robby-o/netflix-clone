import cookie from 'cookie'
import type { NextApiResponse } from 'next'
import { Data } from '@/pages/api/login'

const MAX_AGE: number = 7 * 24 * 60 * 60

type CookieData = Data & { setCookie: string }

export const setTokenCookie = (
  token: string,
  res: NextApiResponse<CookieData>
) => {
  const setCookie = cookie.serialize('token', token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
  // sets in browser
  res.setHeader('Set-Cookie', setCookie)
}
