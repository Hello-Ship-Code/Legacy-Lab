import z from 'zod'

export const postUrlSchema = z.object({
  redirectUrl: z.string().url('Invalid URL format'),
})
