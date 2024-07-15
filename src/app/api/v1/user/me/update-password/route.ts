import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import { updatePasswordValidator } from '@/validators/user/passwordSchemas.validators';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { user } = await validateToken(req);
        await validate(body, updatePasswordValidator);
        const { oldPassword, newPassword } = body;
        console.log({ oldPassword, newPassword, user });

        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: 'old password is not correct', success: false }, { status: 400 });
        }

        user.password = newPassword;
        await user.save();

        return NextResponse.json({ message: 'password changed successfully', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while updating password:', error);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
