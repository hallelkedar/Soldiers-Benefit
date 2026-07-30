import z, { literal, union } from "zod";

const giftCardDetailsSchema = z.object({
    cardProvider: z.string(""),
    monthlyValue: z.coerce.number(),
    validMerchants: z.array(),
  })

const diningHallDetailsSchema = z.object({
    baseId: z.string(),
    kosherLevel: z.string(),
    mealTimes: z.array(),
  })

export const benefitsSchema = z.discriminatedUnion("benefitType", [
  z.object({
    benefitType: z.literal("giftCard"),
    unit: z.string("unit is require field"),
    budgetApproved: z.coerce.boolean("Budget approved must be true or false"),
    decisionReason: z.string("decisionReason is require field"),
    startDate: z.string().optional(),
    details: giftCardDetailsSchema
  }),
  z.object({
    benefitType: z.literal("diningHall"),
    unit: z.string("unit is require field"),
    budgetApproved: z.boolean(),
    decisionReason: z.string("decisionReason is require field"),
    startDate: z.string().optional(),
    details: diningHallDetailsSchema,
  })
])

export const addBenefitSchema = z.discriminatedUnion("benefitType", [
  z.object({
    benefitType: z.literal("giftCard"),
    budgetApproved: z.boolean("Budget approved must be true or false"),
    startDate: z.string().optional(),
    decisionReason: z.string("decisionReason is require field"),
    details: giftCardDetailsSchema,
    decisionDate: z.string().optional()
  }),
  z.object({
    benefitType: z.literal("diningHall"),
    budgetApproved: z.coerce.boolean(),
    startDate: z.string().optional(),
    decisionReason: z.string("decisionReason is require field"),
    details: diningHallDetailsSchema,
    decisionDate: z.string().optional()
  })
])