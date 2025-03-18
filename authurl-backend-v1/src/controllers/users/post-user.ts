import { RequestHandler } from "express"

import { User } from "@prisma/client"
import { prisma } from "../../config/db.config"

import { setUser } from "../../utils/auth"
import HttpError from "../../utils/HttpError"
import { hashPassword, verifyPassword } from "../../utils/pre-config"

export type signUpUserHandler = RequestHandler<never,
  {
    newUser?: User
  },
  { userName?: string, email: string, password: string }>

export const signUpUser: signUpUserHandler = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
      return next(new HttpError('user details required', 404))
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword
      }
    })

    if (!newUser) {
      return next(new HttpError('something is fishy', 400))
    }

    res.redirect('/login')

  } catch (error) {
    next(error)
  }

}

export const loginUser: signUpUserHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new HttpError('user details required', 404))
    }

    const user = await prisma.user.findFirst({
      where: { email }
    })

    console.log(user)

    if (!user) {
      return next(new HttpError('no user found', 409))
    }

    const isMatch = verifyPassword(password, user.password)

    console.log(isMatch)

    if (!isMatch) {
      return next(new HttpError("Invalid credentials", 401));
    }

    const token = setUser(user)
    res.cookie('uuid', token)

    res.redirect('/profile')

  } catch (error) {
    next(error)
  }
}