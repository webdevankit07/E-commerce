import { z } from 'zod';

export const updatePasswordSchema = z.object({
    oldPassword: z.string({ required_error: 'old password is required' }),
    newPassword: z
        .string({ required_error: 'new password is required' })
        .min(8, 'password must be at least 8 characters')
        .max(100, 'password must be at most 100 characters'),
});

export const resetPasswordSchema = z.object({
    newPassword: z
        .string({ required_error: 'new password is required' })
        .min(8, 'password must be at least 8 characters')
        .max(100, 'password must be at most 100 characters'),
});
