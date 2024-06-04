import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id } = params;
        const { userId } = await validateToken(req);

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'user not found', success: false }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { address: { _id: id } } }, { new: true });

        return NextResponse.json({ user: updatedUser, message: 'address deleted', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while saving user address:', error);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
