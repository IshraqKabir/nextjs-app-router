import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Not a valid email"),
  password: z
    .string()
    .min(8, "Password length cannot be less than 8.")
    .max(60, "Password length cannot be more than 60."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
