import type { RequestHandler } from 'express'

export const signupViewController: RequestHandler = async (_req, res, _next) => {
  res.render('signup')
}
