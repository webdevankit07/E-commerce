import { ConnectDB } from '@/config/connectDB';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import { validate } from '@/helpers/validateData';
import { registerUserValidator } from '@/validators/user/userSchema.validators';

export const POST = async (request: NextRequest) => {
    await ConnectDB();

    try {
        const body = await request.json();
        const { firstname, lastname, username, email, mobile, password } = body;
        await validate(body, registerUserValidator);

        const userExistWithEmail = await User.findOne({ email });
        const userExistWithUsername = await User.findOne({ username });
        const userExistWithMobile = await User.findOne({ mobile });
        if (userExistWithEmail) {
            return NextResponse.json({ message: 'email already exist', success: false }, { status: 400 });
        }
        if (userExistWithUsername) {
            return NextResponse.json({ message: 'username already exist', success: false }, { status: 400 });
        }
        if (userExistWithMobile) {
            return NextResponse.json({ message: 'mobile number already exist', success: false }, { status: 400 });
        }

        await User.create({ firstname, lastname, username, email, mobile, password });
        const user = await User.findOne({ email }).select('firstname lastname username email mobile role');
        if (!user) {
            return NextResponse.json({ message: 'User not registered', success: false }, { status: 400 });
        }

        const accessToken = user.genaratetAccessToken();

        const response = NextResponse.json(
            { user, message: 'User registered successfully', success: true },
            { status: 201 }
        );
        response.cookies.set('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });

        return response;
    } catch (error: any) {
        console.error('Error registering user: ' + error);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
