/**
 * Hashes a given password asynchronously.
 * @param password - The plain text password.
 * @returns A promise that resolves to the hashed password.
 */
import bcrypt from 'bcrypt';

import { env } from '../config/env.config';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, env.SALTROUNDS)
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)

}