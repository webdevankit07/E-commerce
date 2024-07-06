import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Coupon from '@/models/coupon.model';
import { CreateCouponDataType } from '@/types';
import { CreateCouponValidator } from '@/validators/couponSchema.validators';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body: CreateCouponDataType = await req.json();
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ message: 'You are not Admin', success: false }, { status: 400 });
        await validate(body, CreateCouponValidator);

        const couponExist = await Coupon.findOne({ name: body.name });
        if (couponExist) {
            return NextResponse.json({ message: 'Coupon already exists', success: false }, { status: 400 });
        }

        const coupon = await Coupon.create({
            name: body.name.toUpperCase(),
            expiry: body.expiry,
            discount: +body.discount,
        });

        return NextResponse.json({ coupon, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while creating coupon', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
