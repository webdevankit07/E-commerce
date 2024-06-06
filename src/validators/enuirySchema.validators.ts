import { z } from 'zod';
import { email, mobile } from './user/userSchema.validators';

const name = z.string({ required_error: 'coupon name is required' }).min(3, 'name must be a atleast 3 letter');
const comment = z.string({ required_error: 'comment is required' });

export const CreateEnqValidator = z.object({ name, email, mobile, comment });

export const UpdateEnqValidator = z.object({
    name: name.optional(),
    email: email.optional(),
    mobile: mobile.optional(),
    comment: comment.optional(),
});
