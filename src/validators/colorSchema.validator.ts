import { z } from 'zod';

const name = z.string({ required_error: 'name is required' }).min(1, 'Please enter valid brand name');

export const CreateColorValidator = z.object({ name });
export const UpdateColorValidator = z.object({ name }).optional();
