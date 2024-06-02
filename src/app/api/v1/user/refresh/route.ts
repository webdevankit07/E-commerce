import jwt from 'jsonwebtoken';
import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { refreshToken } = await validateToken(req);

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid refresh token' }, { status: 400 });
        }

        const decodedRefreshToken: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
        if (!decodedRefreshToken || user.id !== decodedRefreshToken._id) {
            return NextResponse.json({ success: false, message: 'Invalid refresh token' }, { status: 400 });
        }

        const accessToken = user.genaratetAccessToken();

        const response = NextResponse.json({ success: true, message: 'token refreshed' }, { status: 200 });
        response.cookies.set('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });
        return response;
    } catch (error: any) {
        console.log('Error while refreshing token', error);
        const response = NextResponse.json({ success: false, message: error.message }, { status: 500 });
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return response;
    }
};
