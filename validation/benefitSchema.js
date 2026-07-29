import z from "zod";

export const giftCardSchema = z.object({
  unit: z.string(),
  benefitType: z.enum(["giftCard", "diningHall"]),
  decisionReason: z.string(),
  budgetApproved: z.boolean(),
  startDate: z.string().optional(),
  details: z.object({
    cardProvider: z.string(),
    monthlyValue: z.number(),
    validMerchants: z.array(),
  }),
});

export const diningHallSchema = z.object({
  unit: z.string(),
  benefitType: z.enum(["giftCard", "diningHall"]),
  decisionReason: z.string(),
  budgetApproved: z.boolean(),
  startDate: z.string().optional(),
  details: z.object({
    baseId: z.string(),
    kosherLevel: z.string(),
    mealTimes: z.string(),
  }),
});
