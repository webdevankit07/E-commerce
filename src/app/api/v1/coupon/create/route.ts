import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Coupon from '@/models/coupon.model';
import { CreateCouponSchema } from '@/validators/couponSchemas';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ message: 'You are not Admin', success: false }, { status: 400 });
        await validate(body, CreateCouponSchema);

        const couponExist = await Coupon.findOne({ name: body.name });
        if (couponExist) {
            return NextResponse.json({ message: 'Coupon already exists', success: false }, { status: 400 });
        }

        const coupon = await Coupon.create(body);

        return NextResponse.json({ coupon, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while creating coupon', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
