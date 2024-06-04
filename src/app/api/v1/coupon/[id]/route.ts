import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Coupon from '@/models/coupon.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not Admin', success: false }, { status: 400 });
        }

        const coupon = await Coupon.findById(id).select('-__v');

        return NextResponse.json({ coupon, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while access the coupon', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
