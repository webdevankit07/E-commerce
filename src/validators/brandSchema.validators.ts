import { z } from 'zod';

const name = z.string({ required_error: 'name is required' }).min(1, 'Please enter valid brand name');

export const CreateBrandValidator = z.object({ name });
export const UpdateBrandValidator = z.object({ name }).optional();
