import { prisma } from '../../../config/db.config'

import { hashPassword } from '../../../utils/user/passwordHashing'
import type { signupUserData } from '../../../utils/user/userResponse'

export const signUpUser = async (userData: signupUserData) => {
  try {
    const hashedPassword = await hashPassword(userData.password)

    return prisma.user.create({
      data: {
        userName: userData.userName,
        email: userData.email,
        profilePicture:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABbXr4i-QODqhy7tofHYmTYh05rYPktzacw&s',
        password: hashedPassword,
      },
    })
  } catch (error) {
    throw new Error(`Signup failed: ${(error as Error).message}`)
  }
}
