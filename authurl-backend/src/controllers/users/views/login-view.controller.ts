import type { RequestHandler } from 'express'

import HttpError from '../../../utils/error-handlers/HttpError'

export const loginViewController: RequestHandler = async (_req, res, next) => {
  try {
    res.render('login')
  } catch (error) {
    next(new HttpError(`${error}`, 506))
  }
}
