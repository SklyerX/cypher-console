import { z } from "zod";

export const AppValidator = z.object({
  name: z.string().min(3).max(16),
});

export type AppCredentials = z.infer<typeof AppValidator>;
