import { z } from "zod";

export const watchlistElementValidation = z.strictObject({
  address: z.string(),
  tag: z.string().optional(),
  emailNotification: z.boolean(),
  assetsNotifications: z.strictObject({
    xdai: z.strictObject({ incoming: z.boolean(), outgoing: z.boolean() }),
    fts: z.strictObject({ incoming: z.boolean(), outgoing: z.boolean() }),
    nfts: z.strictObject({ incoming: z.boolean(), outgoing: z.boolean() }),
  }),
});

export const privateTagType = z.union([
  z.literal("address"),
  z.literal("transaction"),
]);

export const privateTagValidation = z.strictObject({
  _id: z.string(),
  tag: z.string(),
  value: z.string(),
  type: privateTagType,
});

export const apiKeyValidation = z.strictObject({
  key: z.string().uuid(),
  name: z.string(),
});
