import bcrypt from 'bcrypt'

import { env } from '../../config/env.config'

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, env.SALTROUNDS)
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword)
}
