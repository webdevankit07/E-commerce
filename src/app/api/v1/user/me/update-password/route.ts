import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import { updatePasswordSchema } from '@/validators/updatePassword.validater';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { user } = await validateToken(req);
        await validate(body, updatePasswordSchema);
        const { oldPassword, newPassword } = body;

        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordCorrect) {
            return NextResponse.json({ success: false, message: 'old password is not correct' }, { status: 400 });
        }

        user.password = newPassword;
        await user.save();

        return NextResponse.json({ success: false, message: 'password changed successfully' }, { status: 200 });
    } catch (error: any) {
        console.log('Error while fetching user:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};
