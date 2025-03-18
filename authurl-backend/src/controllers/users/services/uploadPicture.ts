import { prisma } from "../../../config/db.config"

import HttpError from "../../../utils/error-handlers/HttpError"

export const uploadPicture = async (userId: string, profilePicture: string) => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { profilePicture }
    })
  } catch (error) {
    throw new HttpError(`${error}`, 401)
  }
}