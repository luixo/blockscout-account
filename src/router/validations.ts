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
