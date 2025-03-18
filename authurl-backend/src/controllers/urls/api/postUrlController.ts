import type { RequestHandler } from 'express'

import { postUrlSchema } from './../../../Validation/urlValidation/urlPostValidation'

import HttpError from '../../../utils/error-handlers/HttpError'
import { postUrl } from '../services/postUrl'

export const postUrlController: RequestHandler = async (req, res, next) => {
  try {
    const { redirectUrl } = postUrlSchema.parse(req.body)
    const userId = res.locals.user?.id

    if (!redirectUrl) {
      res.redirect('/user')
    }

    if (!userId) {
      res.redirect('/login')
    }

    await postUrl(redirectUrl, userId as string)

    res.redirect('/user')
  } catch (error) {
    next(new HttpError(`${error}`, 404))
  }
}
