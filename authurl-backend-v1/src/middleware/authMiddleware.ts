import { type Request, type Response, type NextFunction } from "express";

import { getUser } from "../utils/auth";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.uuid; // Get JWT token from cookies

  if (!token) {
    console.log("No token found, redirecting...");
    return res.redirect("/login");
  }

  const user = getUser(token);

  if (!user) {
    console.log("Invalid token, redirecting...");
    return res.redirect("/login");
  }

  res.locals.user = user;

  next();
};
