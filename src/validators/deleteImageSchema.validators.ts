import { z } from 'zod';

export const DeleteImageValidator = z.object({
    public_id: z.string({ required_error: 'image public_id is required' }),
});
