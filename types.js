import { z } from "zod";

const createTodo = z.object({
	title: z.string(),
	description: z.string(),
});

const updateTodo = z.object({
	id: z.string(),
});

const userSchema = z.object({
	username: z
	  .string()
	  .min(8, { message: "username must be atleast 8 characters" }),
	password: z
	  .string()
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
	  })
	  .refine((val) => val.length >= 8, {
		message: "Password must be at least 8 characters long.",
	  }),
  });
  

export { createTodo, updateTodo, userSchema};
