import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
    await ConnectDB();
    try {
        const { userId, isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ success: false, message: 'only admin can delete the user' }, { status: 400 });
        }

        await User.findByIdAndDelete(userId);

        return NextResponse.json({ success: true, message: 'user successfully deleted' }, { status: 200 });
    } catch (error: any) {
        console.log('Error while deleting the user:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};
