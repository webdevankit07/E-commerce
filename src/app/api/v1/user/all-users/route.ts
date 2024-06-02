import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });

        const users = await User.find().select('-password');
        return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
        console.log('Error while geting all users:', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
