import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Coupon from '@/models/coupon.model';
import { UpdateCouponValidator } from '@/validators/couponSchema.validators';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { name, expiry, discount } = body;
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not Admin', success: false }, { status: 400 });
        }
        await validate(body, UpdateCouponValidator);

        const coupon = await Coupon.findByIdAndUpdate(id, { name, discount, expiry: new Date(expiry) }, { new: true });

        return NextResponse.json({ coupon, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while updating coupon', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
