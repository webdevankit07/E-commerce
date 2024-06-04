import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { userId } = await validateToken(req);
        const me = await User.findById(userId).populate('wishlist').select('wishlist');

        return NextResponse.json(me, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
