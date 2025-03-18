import { RequestHandler } from "express";
import shortid from "shortid";
import { z } from "zod";

import { Url, Visit } from "@prisma/client";
import { prisma } from "../../config/db.config";

import HttpError from "../../utils/HttpError";

const postUrlSchema = z.object({
  redirectUrl: z.string().url("Invalid URL format"),
});

export type PostUrlHandler = RequestHandler<
  never,
  { url?: Url & { visitHistory: Visit[] }; error?: string },
  { redirectUrl: string },
  never
>;

export const postUrl: PostUrlHandler = async (req, res, next) => {
  try {
    // Validate request body safely
    const parsed = postUrlSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(new HttpError(parsed.error.errors[0].message, 400));
    }
    const { redirectUrl } = parsed.data;

    if (!res.locals.user) {
      return next(new HttpError("Unauthorized: User not logged in", 401));
    }

    const userId = res.locals.user?.id;

    if (!userId) {
      return next(new HttpError("Unauthorized: User not logged in", 401));
    }

    const shortId = shortid.generate();

    // Use a transaction to perform both operations in a single DB call
    const [_newUrl, _urls] = await prisma.$transaction([
      prisma.url.create({
        data: { shortId, userId, redirectUrl, visitHistory: { create: [] } },
      }),
      prisma.url.findMany({
        where: { userId },
        include: { visitHistory: true },
      }),
    ]);
    res.redirect('/profile')

  } catch (error) {
    next(error);
  }
};
