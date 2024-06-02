import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ success: false, message: 'You are not admin' }, { status: 400 });
        }

        const user = await User.findById(id).select('-password');
        if (!user) {
            return NextResponse.json({ success: false, message: 'user not found!' }, { status: 400 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        console.log('Error while geting user:', error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};
