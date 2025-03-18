/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response, type NextFunction } from 'express'

export const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = Number(error.statusCode) || 500 // ✅ Ensure primitive number
  const message = error.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  })
}
