import type { RequestHandler } from 'express'

import { userValidation } from '../../../Validation/userValidation/userSignupValidation'

import HttpError from '../../../utils/error-handlers/HttpError'
import { signUpUser } from '../services/signUpUser'

export const signupController: RequestHandler = (req, res, next) => {
  try {
    const { userName, email, password } = userValidation.parse(req.body)

    if (!userName || !password || !email) {
      res.redirect('/signup')
      return next(new HttpError('data not found', 404))
    }

    signUpUser({ userName, email, password })

    res.redirect('/login')
  } catch (error) {
    return next(new HttpError(`${error}`, 409))
  }
}
