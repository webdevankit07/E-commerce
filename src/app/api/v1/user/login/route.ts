import { ConnectDB } from '@/config/connectDB';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { identifier, password } = body;

        const userExist = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

        if (userExist && (await userExist.isPasswordCorrect(password))) {
            const accessToken = userExist.genaratetAccessToken();
            const refreshToken = userExist.genaratetRefreshToken();

            userExist.refreshToken = refreshToken;
            await userExist.save();

            const response = NextResponse.json(
                { success: true, message: 'User logged in successfully' },
                { status: 200 }
            );
            response.cookies.set('access_token', accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24,
            });
            response.cookies.set('refresh_token', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 72,
            });
            return response;
        } else {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
        }
    } catch (error: any) {
        console.error('Error while login: ' + error.message);
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
};
