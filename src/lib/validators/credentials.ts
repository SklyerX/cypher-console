import { z } from "zod";

export const CredentialsValidator = z.object({
  productKey: z.string().min(5).max(60),
  distributerId: z.string().min(5).max(30),
  accessKey: z.string().min(5).max(50),
  signature: z.string().min(5).max(40),
  expiresIn: z.enum(["one-day", "one-week", "one-month", "indefinitely"]),
});

export type CredentialsCredentials = z.infer<typeof CredentialsValidator>;
