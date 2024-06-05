import { z } from 'zod';

export type CartProduct = {
    count: number;
    color: string;
};

export const AddToCartValidator = z.object({
    count: z.number({ required_error: 'Count is required' }),
    color: z.string({ required_error: 'Color is required' }),
});

export const updateCartProductValidator = z.object({
    count: z.number({ required_error: 'Count is required' }),
    color: z.string({ required_error: 'Color is required' }),
});
