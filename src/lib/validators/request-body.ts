import { z } from "zod";

export const RequestBodyValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(128),
  hcaptcha_value: z.string().min(4).max(128),
  method: z.enum(["jwt", "auto"]),
  grant_type: z.enum([
    "access_token",
    "identify",
    "offline-access",
    "offline-access",
  ]),
});

export type RequestBodyCredentials = z.infer<typeof RequestBodyValidator>;
