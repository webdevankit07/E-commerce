import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { userId } = await validateToken(req);
        const me = await User.findById(userId).select('-password');
        // const me = {
        //     _id: user._id,
        //     firstname: user.firstname,
        //     lastname: user.lastname,
        //     username: user.username,
        //     email: user.email,
        //     mobile: user.mobile,
        //     role: user.role,
        //     cart: user.cart,
        //     address: user.address,
        //     wishlist: user.wishlist,
        // };

        return NextResponse.json(me, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};
