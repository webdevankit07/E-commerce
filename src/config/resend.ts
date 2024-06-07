import { Resend } from 'resend';
import { resendAPIKey } from '.';

export const resend = new Resend(resendAPIKey);
