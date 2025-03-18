
export default class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Capture stack trace for debugging
    Error.captureStackTrace(this, this.constructor);

    // Set prototype to ensure `instanceof` works properly
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  // Factory method
  static from(message: string, status: number): HttpError {
    return new HttpError(message, status);
  }
}
