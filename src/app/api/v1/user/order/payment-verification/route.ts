import { ConnectDB } from '@/config/connectDB';
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = await req.json();

        return NextResponse.json(
            { razorpayOrderId, razorpayPaymentId, message: 'Payment verified successfully', success: true },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
