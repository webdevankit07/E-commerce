import { z } from 'zod';

const title = z.string({ required_error: 'title is required' });

export const CreateBlogCategorySchema = z.object({ title });
export const UpdateBlogCategorySchema = z.object({ title });
export const CreateProductCategorySchema = z.object({ title });
export const UpdateProductCategorySchema = z.object({ title });
