import type { RequestHandler } from 'express'

import HttpError from '../../../utils/error-handlers/HttpError'
import { getUrlByIdController } from '../services/urlsAnalytics'

export const urlAnalysis: RequestHandler = async (req, res, next) => {
  try {
    const shortId = req.params.shortId

    if (!shortId) {
      res.redirect('/user')
    }

    const result = await getUrlByIdController(shortId)

    res.redirect(result.redirectUrl)
  } catch (error) {
    next(new HttpError(`${error}`, 404))
  }
}
