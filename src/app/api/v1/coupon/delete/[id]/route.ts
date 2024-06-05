import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Coupon from '@/models/coupon.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not Admin', success: false }, { status: 400 });
        }

        const coupon = await Coupon.findByIdAndDelete(id);
        if (!coupon) {
            return NextResponse.json({ message: 'Coupon not found', success: false }, { status: 400 });
        }

        return NextResponse.json({ coupon, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while creating coupon', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
