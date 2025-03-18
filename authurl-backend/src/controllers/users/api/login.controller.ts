import type { RequestHandler } from 'express'

import { setUser } from '../../../utils/JWT/auth'
import { loginUser } from '../services/loginUser'

export const loginController: RequestHandler = async (req, res, _next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.redirect('/login')
      return
    }

    const user = await loginUser({ email, password })

    if (!user) {
      res.redirect('/login')
      return
    }

    res.cookie('uuid', setUser(user))
    res.render('redirect', { path: '/user' })
    return
  } catch (error) {
    console.log('error:', error)
    res.json({ error })
  }
}
