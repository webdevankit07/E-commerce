import { z } from 'zod';

const name = z.string({ required_error: 'name is required' }).min(1, 'Please enter valid Color name');
const colorCode = z
    .string({ required_error: 'color code is required' })
    .min(7, 'invalid color code')
    .max(7, 'invalid color code');

export const CreateColorValidator = z.object({ name, colorCode });
export const UpdateColorValidator = z.object({ name, colorCode }).optional();
