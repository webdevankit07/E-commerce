import { z } from 'zod';

export const DeleteImageSchema = z.object({
    public_id: z.string({ required_error: 'image public_id is required' }),
});
