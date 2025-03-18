import dotenv from 'dotenv'

dotenv.config()

const env = {
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL ?? 'mongodb://127.0.0.1:27017',
  JWT_SECRET: process.env.JWT_SECRET ?? 'a-string-secret-at-least-256-bits-longs',
  SALTROUNDS: Number(process.env.SALTROUNDS ?? 10),
  NODE_ENV: process.env.NODE_ENV ?? 'production',
}

export { env }
