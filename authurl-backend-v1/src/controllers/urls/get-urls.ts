import { type RequestHandler } from 'express';

import { Url, User, Visit } from '@prisma/client';
import { prisma } from '../../config/db.config';

import HttpError from '../../utils/HttpError';

// export type GetUrlByIdHandler = RequestHandler<{ shortId: string }, { urls: (Url & { visitHistory: Visit[] }) }>
export type GetUrlHandler = RequestHandler<never,
  {
    urls: (Url & { visitHistory: Visit[] })[],
    userData: User
  }>

export type GetUrlByIdHandler = RequestHandler<
  { id: string },
  { url?: Url; visitCount?: number }
>;

export const getUrlById: GetUrlByIdHandler = async (req, res, next) => {
  try {
    const shortId = req.params.id.trim()

    if (!shortId) return next(new HttpError('id required', 404))

    const urlUpdate = await prisma.url.update({
      where: { shortId },
      data: {
        visitHistory: {
          create: [{ timestamp: new Date() }]
        }
      }
    })

    res.redirect(urlUpdate.redirectUrl)

  } catch (error) {
    next(error);
  }
};

export const getUrls: GetUrlHandler = async (_req, res, next) => {
  try {
    const userId = res.locals.user?.id;

    if (!userId) {
      return next(new HttpError("Unauthorized: User not logged in", 401));
    }

    const urls = await prisma.url.findMany({
      where: { userId },
      include: { visitHistory: true },
    });

    res.render('profile', { urls: urls || [] });

  } catch (error) {
    next(error);
  }
};
