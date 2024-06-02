import { ConnectDB } from '@/config/connectDB';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import { validate } from '@/helpers/validateData';
import { registerUserSchema } from '@/validators/regiterUser.validator';

export const POST = async (request: NextRequest) => {
    await ConnectDB();

    try {
        const body = await request.json();
        const { firstname, lastname, username, email, mobile, password } = body;
        await validate(body, registerUserSchema);

        const userExistWithEmail = await User.findOne({ email });
        const userExistWithUsername = await User.findOne({ username });
        const userExistWithMobile = await User.findOne({ mobile });
        if (userExistWithEmail) {
            return NextResponse.json({ success: false, message: 'email already exist' }, { status: 400 });
        }
        if (userExistWithUsername) {
            return NextResponse.json({ success: false, message: 'username already exist' }, { status: 400 });
        }
        if (userExistWithMobile) {
            return NextResponse.json({ success: false, message: 'mobile number already exist' }, { status: 400 });
        }

        const newUser = await User.create({ firstname, lastname, username, email, mobile, password });

        const accessToken = newUser.genaratetAccessToken();

        const response = NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
        response.cookies.set('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });
        return response;
    } catch (error: any) {
        console.error('Error registering user: ' + error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};
