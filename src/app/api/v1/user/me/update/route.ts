import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { updateUserSchema } from '@/validators/user/updateUser.validator';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { user } = await validateToken(req);
        await validate(body, updateUserSchema);
        const { firstname, lastname, username, email, mobile } = body;

        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;

        if (username) {
            const isUsernameExist = await User.findOne({ username });
            if (isUsernameExist && isUsernameExist?.username !== user.username) {
                return NextResponse.json({ message: 'username already exist', success: false }, { status: 400 });
            }
            user.username = username.toLowerCase();
        }

        if (email) {
            const isEmailExist = await User.findOne({ email });
            if (isEmailExist && isEmailExist?.email !== user.email) {
                return NextResponse.json({ message: 'email already exist', success: false }, { status: 400 });
            }
            user.email = email;
        }

        if (mobile) {
            const isMobileExist = await User.findOne({ mobile });
            if (isMobileExist && isMobileExist?.mobile !== user.mobile) {
                return NextResponse.json({ message: 'mobile already exist', success: false }, { status: 400 });
            }
            user.mobile = mobile;
        }

        await user.save();

        return NextResponse.json({ message: 'user details successfully updated', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while fetching user:', error);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
