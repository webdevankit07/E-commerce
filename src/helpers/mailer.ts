import { resend } from '@/utils/resend';
import ResetPasswordEmail from '@/emails/ResetPasswordEmail';

export const sendEmail = async (email: string, username: string, token: string) => {
    try {
        const mailResponse = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Reset Your Password',
            react: ResetPasswordEmail(token, username),
        });

        return mailResponse;
    } catch (emailError) {
        console.log('Error sending reset password email', emailError);
        return { success: false, message: 'failed to send verification email' };
    }
};
