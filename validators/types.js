import { z } from "zod";

const createTodo = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." }),
  description: z.string().optional(),
});

const updateTodo = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

const userSchema = z.object({
  username: z
    .string()
    .min(8, { message: "Username must be at least 8 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one digit.",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character.",
    }),
});

export { createTodo, updateTodo, userSchema };
