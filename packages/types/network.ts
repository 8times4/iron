import { z } from "zod";

export const networkSchema = z
  .object({
    name: z.string().min(1),
    explorer_url: z.string().optional().nullable(),
    http_url: z.string().min(1),
    ws_url: z.string().nullable().optional(),
    currency: z.string().min(1),
    chain_id: z.number(),
    decimals: z.number(),
    force_is_anvil: z.boolean(),
  })
  .refine(
    (data) => {
      const isAnvil = data.chain_id === 31337 || data.force_is_anvil;
      return !isAnvil || (!!data.ws_url && data.ws_url.length > 0);
    },
    {
      path: ["ws_url"],
      message: "WebSockets are mandatory for dev networks",
    },
  );

export type Network = z.infer<typeof networkSchema>;
