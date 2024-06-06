import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import User from '@/models/user.model';
import { resetPasswordvalidator } from '@/validators/user/passwordSchemas.validators';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const PUT = async (req: NextRequest, { params }: { params: { token: string } }) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { newPassword } = body;
        const { token } = params;
        await validate(body, resetPasswordvalidator);

        const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json(
                { message: 'Token Expired, Please try again later', success: false },
                { status: 400 }
            );
        }

        user.password = newPassword;
        user.passwordResetToken = '';
        user.passwordResetExpires = new Date(0);
        await user.save();

        return NextResponse.json({ message: 'password successfully changed', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while reset password:', error);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
