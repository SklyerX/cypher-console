import { z } from "zod";

export const AuditLogValidator = z.object({
  SDK: z.enum(["NODEJS_SDK", "WEB_PLATFORM"]),
  eventType: z.enum(["ENCRYPT", "DECRYPT"]),
  byteLength: z.number().positive(),
});
