import { z } from 'zod';

export const CreateProductSchema = z.object({
    title: z.string({ required_error: 'title is required' }),
    slug: z.string({ required_error: 'slug is required' }),
    description: z.string({ required_error: 'description is required' }),
    price: z.number({ required_error: 'price is required' }),
    category: z.string({ required_error: 'category is required' }),
    brand: z.string({ required_error: 'brand is required' }),
    quantity: z.number({ required_error: 'quantity is required' }),
    image: z.object({ public_id: z.string(), url: z.string() }).optional(),
    color: z.array(z.string({ required_error: 'title is required' })).optional(),
    tags: z.string().optional(),
    rating: z.object({ star: z.number(), comment: z.string() }).optional(),
});
