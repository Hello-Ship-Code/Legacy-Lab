import jwt, { JwtPayload } from 'jsonwebtoken'

import { User } from "@prisma/client"
import { env } from '../config/env.config'

interface DecodedUser extends JwtPayload {
  id: string;
  userName: string;
  email: string;
}

export const setUser = (user: User) => {
  return jwt.sign({
    id: user.id,
    email: user.email
  }, env.JWT_SECRET)
}

export const getUser = (token: string): DecodedUser | null => {
  try {
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload; // Ensure it's a payload

    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      return decoded as DecodedUser; // Ensure it has the required properties
    }

    return null;



  } catch (error) {
    return null;
  }
};