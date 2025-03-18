import z from 'zod'

export const userValidation = z.object({
  userName: z.string().min(4, 'userName should be at least 5 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(4, 'password should be at least 4 characters')
    .max(32, 'password should not exceed 32 characters')
    .regex(/[A-Z]/, 'Password should contain at least one upper case letter')
    .regex(/[a-z]/, 'Password should contain at least one lower case letter')
    .regex(/[0-9]/, 'Password should contain at least one number')
    .regex(/[A-Za-z0-9]/, 'Password should contain at least special character')
    .regex(/^\S*$/, 'Password cannot contain spaces'),
})
