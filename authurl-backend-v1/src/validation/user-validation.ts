import z from "zod";

export const userSchema = z.object({
  userName: z.string().min(5, "User name must be at least 5 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(5, "Password must be at least 5 characters long")
    .max(32, "Password should not exceed 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .regex(/^\S*$/, "Password cannot contain spaces")
});
