import { Response } from 'express';

import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Locals {
      user?: Omit<User, "password", "createdAt">
    }
  }
}

export { };
