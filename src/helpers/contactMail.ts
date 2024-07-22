import { resend } from '@/config/resend';
import ContactEmail from '@/components/emails/ContactEmail';

export const contactMail = async (name: string, email: string, mobile: string, comment: string) => {
    try {
        const mailResponse = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: 'ankityadav.webdev@gmail.com',
            subject: `Contact`,
            react: ContactEmail(name, email, mobile, comment),
        });

        return mailResponse;
    } catch (emailError) {
        console.log('Error sending reset password email', emailError);
        return { success: false, message: 'failed to send verification email' };
    }
};
