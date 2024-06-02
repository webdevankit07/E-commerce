import { z } from 'zod';

export const UpdateProductSchema = z.object({
    title: z.string({ required_error: 'title is required' }).optional(),
    description: z.string({ required_error: 'description is required' }).optional(),
    price: z.number({ required_error: 'price is required' }).optional(),
    category: z.string({ required_error: 'category is required' }).optional(),
    brand: z.string({ required_error: 'brand is required' }).optional(),
    quantity: z.number({ required_error: 'quantity is required' }).optional(),
    image: z.object({ public_id: z.string(), url: z.string() }).optional(),
    color: z.array(z.string({ required_error: 'title is required' })).optional(),
    tags: z.string().optional(),
    rating: z.object({ star: z.number(), comment: z.string() }).optional(),
});
