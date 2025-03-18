import { prisma } from '../../../config/db.config'

export const getUrlsControllers = async (userId: string) => {
  return await prisma.url.findMany({
    where: { userId },
    include: { visitHistory: true },
  })
}
