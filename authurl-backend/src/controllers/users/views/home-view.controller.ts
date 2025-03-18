import type { RequestHandler } from 'express'

export const homeViewController: RequestHandler = (_req, res, _next) => {
  res.render('home')
}
