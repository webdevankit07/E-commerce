import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    ConnectDB();

    try {
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });

        const blockedUser = await User.findByIdAndUpdate(params.id, { isBlocked: true }, { new: true });
        return NextResponse.json({ message: 'user blocked', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while blocking user', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
