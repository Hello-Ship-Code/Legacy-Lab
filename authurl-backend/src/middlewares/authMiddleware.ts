import type { RequestHandler } from 'express'

import { getUser } from '../utils/JWT/auth'

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.cookies?.uuid

  if (!token) {
    res.render('redirect', { path: '/login' })
    return
  }

  const user = getUser(token)

  if (!user) {
    res.render('redirect', { path: '/login' })
    return
  }

  res.locals.user = user

  next()
}
