import { z } from 'zod';

export const UpdateBlogSchema = z.object({
    title: z.string({ required_error: 'title is required' }).optional(),
    description: z.string({ required_error: 'description is required' }).optional(),
    category: z.string({ required_error: 'category is required' }).optional(),
});
