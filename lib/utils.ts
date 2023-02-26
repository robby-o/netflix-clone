import jwt from 'jsonwebtoken'

type JwtPayload = {
  issuer: string
}

export async function verifyToken(token: string) {
  if (token) {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload

    const userId = decodedToken.issuer

    return userId
  }
  return null
}
