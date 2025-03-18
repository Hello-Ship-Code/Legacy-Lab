import { Request, Response } from 'express';

import { getUrls } from '../urls/get-urls';

const signup = (_req: Request, res: Response) => {
  res.render('signup')
}
const login = (_req: Request, res: Response) => {
  res.render('login')
}

const profile = (_req: Request, res: Response) => {
  res.render('profile',)
}

const home = (_req: Request, res: Response) => {
  res.render('home')
}

export {
  home,
  login,
  signup,
  profile
}