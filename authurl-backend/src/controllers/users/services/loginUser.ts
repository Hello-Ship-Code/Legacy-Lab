import { prisma } from '../../../config/db.config'

import HttpError from '../../../utils/error-handlers/HttpError'
import { verifyPassword } from '../../../utils/user/passwordHashing'
import type { loginUserData } from '../../../utils/user/userResponse'

export const loginUser = async (userData: loginUserData) => {
  const user = await prisma.user.findFirst({
    where: { email: userData.email },
  })

  if (!user) {
    throw new HttpError('user not found', 409)
  }

  const isMatch = await verifyPassword(userData.password, user.password)

  if (isMatch) {
    return user
  }

  throw new HttpError('user not found', 409)
}
