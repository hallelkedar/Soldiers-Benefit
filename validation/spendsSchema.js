import z from "zod";

export const spendsSchema = z.object({
  amount: z.coerce.number().positive("amount has to be a number"),
  reason: z.string().optional(),
});
