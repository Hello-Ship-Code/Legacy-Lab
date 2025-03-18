import shortid from 'shortid'

import { prisma } from '../../../config/db.config'

import HttpError from '../../../utils/error-handlers/HttpError'

export const postUrl = async (redirectUrl: string, userId: string) => {
  try {
    if (!redirectUrl) {
      throw new HttpError('URL not found', 400) // 400 is better for validation errors
    }
    if (!userId) {
      throw new HttpError('User ID is required', 400)
    }

    const shortId = shortid.generate()

    const newUrl = await prisma.url.create({
      data: {
        shortId,
        userId,
        redirectUrl,
      },
      include: {
        visitHistory: true, // Fixed capitalization
      },
    })

    return newUrl // Returning the created URL for better use in controllers
  } catch (error) {
    console.error('Error creating short URL:', error) // Log for debugging
    throw new HttpError('Failed to create URL', 500) // Use a general 500 error
  }
}
