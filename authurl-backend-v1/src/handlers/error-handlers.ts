import { type Response, type Request, type NextFunction } from "express";

import HttpError from "../utils/HttpError";

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(error); // ✅ Logs the error

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      success: false,
      statusCode: error.statusCode,
      message: error.message,
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
    return
  }

  // Default error handling (this must return something)
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
  return
};
