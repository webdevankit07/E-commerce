import { z } from 'zod';

export const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export const firstname = z
    .string({ required_error: 'firstname is required' })
    .min(3, 'firstname must be atleast 3 character');

export const lastname = z
    .string({ required_error: 'lastname is required' })
    .min(3, 'lastname must be atleast 3 character');

export const username = z
    .string({ required_error: 'username is required' })
    .min(5, 'username must be atleast 5 character');

export const email = z
    .string({ required_error: 'email is required' })
    .email('Invalid email address')
    .min(7, 'Invalid email address');

export const mobile = z
    .string({ required_error: 'mobile no is required' })
    .regex(phoneRegex, 'Invalid phone number')
    .min(10, 'Invalid phone number')
    .max(10, 'Invalid phone number');

export const password = z
    .string({ required_error: 'password is required' })
    .min(8, 'password must be at least 8 characters')
    .max(100, 'password must be at most 100 characters');

export const registerUserValidator = z.object({ firstname, lastname, username, email, mobile, password });
export const updateUserValidator = z.object({
    firstname: z.optional(firstname),
    lastname: z.optional(lastname),
    username: z.optional(username),
    email: z.optional(email),
    mobile: z.optional(mobile),
});
