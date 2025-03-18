import dotenv from 'dotenv'

dotenv.config();

const port = parseInt(process.env.PORT ?? '3000', 10)

export const env = {
  PORT: port,
  DATABASE_URL: process.env.DATABASE_URL ?? "mongodb://127.0.0.1:27017",
  NODE_ENV: process.env.NODE_ENV ?? 'production',
  DOMAIN: process.env.DOMAIN ?? `http://localhost:${port}`,
  SALTROUNDS: Number(process.env.SALTROUNDS) || 10,
  JWT_SECRET: process.env.JWT_SECRET ?? `this-is-a-test-secret-for-your-application`
}
