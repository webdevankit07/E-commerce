import { z } from 'zod';

const title = z.string({ required_error: 'title is required' }).min(1, 'Please enter valid category');

export const CreateBlogCategorySchema = z.object({ title });
export const UpdateBlogCategorySchema = z.object({ title }).optional();
export const CreateProductCategorySchema = z.object({ title });
export const UpdateProductCategorySchema = z.object({ title }).optional();
