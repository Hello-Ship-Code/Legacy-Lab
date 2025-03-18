import { prisma } from '../../../config/db.config'

export const getUrlByIdController = async (shortId: string) => {
  return await prisma.url.update({
    where: { shortId },
    data: {
      visitHistory: {
        create: [{ timestamp: new Date() }],
      },
    },
  })
}
