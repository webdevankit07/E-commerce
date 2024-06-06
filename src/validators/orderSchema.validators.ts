import { z } from 'zod';

export const CreateOrderValidator = z.object({
    COD: z.boolean({ required_error: 'Create cash order failed. COD is' }),
    couponApplied: z.boolean({ required_error: 'couponApplied is required' }),
});
