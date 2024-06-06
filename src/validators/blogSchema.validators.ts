import { z } from 'zod';

export const CreateBlogValidator = z.object({
    title: z.string({ required_error: 'title is required' }),
    description: z.string({ required_error: 'description is required' }),
    category: z.string({ required_error: 'category is required' }),
});

export const updateBlogValidator = z.object({
    title: z.string({ required_error: 'title is required' }),
    description: z.string({ required_error: 'description is required' }),
    category: z.string({ required_error: 'category is required' }),
});
