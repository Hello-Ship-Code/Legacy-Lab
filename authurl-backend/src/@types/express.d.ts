declare global {
  namespace Express {
    interface Locals {
      user?: {
        id?: string
        email?: string
      }
    }
  }
}

export {}
