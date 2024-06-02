import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ success: false, message: 'You are not admin' }, { status: 400 });

        const users = await User.find().select('-password');
        return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
        console.log('Error while geting all users:', error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};
