import { z } from 'zod';

const title = z.string({ required_error: 'title is required' }).min(1, 'Please enter valid category');

export const CreateBlogCategoryValidator = z.object({ title });
export const UpdateBlogCategoryValidator = z.object({ title }).optional();
export const CreateProductCategoryValidator = z.object({ title });
export const UpdateProductCategoryValidator = z.object({ title }).optional();
