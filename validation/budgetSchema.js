import z from "zod";

export const budgetSchema = z.object({
  unit: z.string("unit is require field"),
  benefitType: z.enum(
    ["giftCard", "diningHall"],
    "benefitType must be giftCard or diningHall",
  ),
  month: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "month must be in YYYY-MM format."),
  allocatedAmount: z.coerce
    .number()
    .positive("allocatedAmount must be a positive number"),
});
