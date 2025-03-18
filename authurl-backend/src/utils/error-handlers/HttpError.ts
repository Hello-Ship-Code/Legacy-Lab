export default class HttpError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = Number(statusCode) // Ensure it's a primitive number

    // Set prototype explicitly to support instanceof checks
    Object.setPrototypeOf(this, HttpError.prototype)
  }

  static from(message: string, status: number): HttpError {
    return new HttpError(message, Number(status)) // Ensure primitive type
  }
}
