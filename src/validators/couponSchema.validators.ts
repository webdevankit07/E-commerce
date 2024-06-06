import { z } from 'zod';

const name = z.string({ required_error: 'coupon name is required' }).min(1, 'invalid coupon');
const expiry = z.string({ required_error: 'expiry date is required' });
const discount = z.number({ required_error: 'discount is required' });

export const CreateCouponValidator = z.object({ name, expiry, discount });
export const UpdateCouponValidator = z.object({
    name: name.optional(),
    expiry: expiry.optional(),
    discount: discount.optional(),
});
