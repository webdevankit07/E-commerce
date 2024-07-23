import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { userId } = await validateToken(req);

        const user = await User.findById(userId);
        if (!user) return NextResponse.json({ message: 'Invalid user', success: false }, { status: 400 });

        await User.findByIdAndUpdate(userId, { refreshToken: '' });

        const res = NextResponse.json({ message: 'Logout successful', success: true }, { status: 200 });
        res.cookies.delete('access_token');
        res.cookies.delete('refresh_token');
        return res;
    } catch (error: any) {
        console.log('Error while logout:', error);
        const res = NextResponse.json({ message: error.message, success: false }, { status: 500 });
        res.cookies.delete('access_token');
        res.cookies.delete('refresh_token');
        return res;
    }
};
