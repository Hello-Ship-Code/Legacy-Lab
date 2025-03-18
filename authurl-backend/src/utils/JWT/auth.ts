import jwt, { type JwtPayload } from 'jsonwebtoken'

import { type User } from '@prisma/client'
import { env } from '../../config/env.config'

interface DecodedUser extends JwtPayload {
  id: string
  userName: string
  email: string
}

export const setUser = (user: User) =>
  jwt.sign({ id: user.id, userName: user.userName, email: user.email }, env.JWT_SECRET)

export const getUser = (token: string): DecodedUser | null => {
  try {
    if (!token) return null

    const decode = jwt.verify(token, env.JWT_SECRET) as JwtPayload

    if (decode && typeof decode === 'object' && 'id' in decode) {
      return decode as DecodedUser
    }

    return null
  } catch (_) {
    return null
  }
}
