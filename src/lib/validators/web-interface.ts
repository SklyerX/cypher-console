import { z } from "zod";

export const WebInterfaceValidator = z.object({
  JWT_SECRET: z.string().min(19).max(19),
  APP_ID: z.string().regex(/^cyApp:v1:[A-Za-z0-9\-_.]+$/),
  APP_SECRET: z.string().regex(/^pss:v1:[A-Za-z0-9\-_.]+$/),
  mode: z.enum(["encrypt", "decrypt"]),
  value: z.string(),
});

export type WebInterfaceCredentials = z.infer<typeof WebInterfaceValidator>;
