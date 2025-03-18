import { prisma } from '../../../config/db.config'

export const getUserById = async (userId: string) => {
  return await prisma.user.findFirst({
    where: { id: userId },
  })
}