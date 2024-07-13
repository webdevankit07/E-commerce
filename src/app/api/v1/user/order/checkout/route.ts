import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        await validateToken(req);
        const option = {
            amount: +body.amount * 100,
            currency: 'INR',
        };

        const order = await instance.orders.create(option);
        if (!order) return NextResponse.json({ order, message: 'some errror occured', success: true }, { status: 400 });

        return NextResponse.json({ order, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
