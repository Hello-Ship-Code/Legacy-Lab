import { type RequestHandler } from 'express';

import { User } from '@prisma/client'; // Correct PascalCase Import
import { prisma } from '../../config/db.config';

import HttpError from '../../utils/HttpError';

export type GetUserHandler = RequestHandler<{ id: string }, { user: User }>;
export type GetUsersHandler = RequestHandler<never, { users: User[] }>;

export const getUsers: GetUsersHandler = async (_req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return next(new HttpError('No users in database', 404))
    }

    res.json({ users });
  } catch (err) {
    next(err);
  }
};

// export const getUserById: GetUserHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       throw new HttpError("URL id required", 400);
//     }

//     const user = await prisma.user.findUnique({ where: { id } });

//     if (!user) {
//       throw new HttpError("User not found", 404);
//     }

//     res.json({ user });
//   } catch (err) {
//     next(err);
//   }
// };
