import type { RequestHandler } from 'express'

import { getUrlsControllers } from '../../urls/services/getUrls'

import HttpError from '../../../utils/error-handlers/HttpError'
import { getUserById } from '../services/getUser'

export const userViewController: RequestHandler = async (_, res, next) => {
  try {
    const userId = res.locals.user?.id

    if (!userId) return res.render('login')

    const urls = (await getUrlsControllers(userId)) || []

    const user = await getUserById(userId)

    res.render('user', { urls, user })
  } catch (error) {
    return next(new HttpError(`${error}`, 409))
  }
}