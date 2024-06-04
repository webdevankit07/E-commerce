import { z } from 'zod';

export const RatingSchema = z.object({
    star: z.number({ required_error: 'rating is required' }),
    comment: z.string({ required_error: 'comment is required' }),
});
