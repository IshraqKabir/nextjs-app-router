import { z } from "zod";

export const userInfoSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  orgId: z.string().uuid(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;
