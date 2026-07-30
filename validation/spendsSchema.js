import z from 'zod';

export const spendsSchema = z.object({
    amount: z.coerce.number('amount has to be a number'),
    reason: z.string().optional()
})