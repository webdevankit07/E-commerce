import { z } from 'zod';
import { email, firstname, lastname, mobile, username } from './regiterUser.validator';

export const updateUserSchema = z.object({
    firstname: z.optional(firstname),
    lastname: z.optional(lastname),
    username: z.optional(username),
    email: z.optional(email),
    mobile: z.optional(mobile),
});
