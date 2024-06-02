import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
    await ConnectDB();
    try {
        const { userId } = await validateToken(req);
        await User.findByIdAndDelete(userId);

        const res = NextResponse.json({ message: 'Account successfully deleted', success: true }, { status: 200 });
        res.cookies.delete('access_token');
        return res;
    } catch (error: any) {
        console.log('Error while deleting the user:', error);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
