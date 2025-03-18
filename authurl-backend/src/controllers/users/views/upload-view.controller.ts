import type { RequestHandler } from 'express'

export const uploadViewController: RequestHandler = async (_req, res, _next) => {
  res.render('upload')
}
