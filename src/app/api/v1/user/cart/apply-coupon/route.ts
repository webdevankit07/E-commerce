import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Cart from '@/models/cart.model';
import { NextRequest, NextResponse } from 'next/server';
import Coupon from '@/models/coupon.model';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { userId } = await validateToken(req);

        const validCoupon = await Coupon.findOne({ name: body.coupon });
        if (!validCoupon) {
            return NextResponse.json({ message: 'Invalid coupon', success: true }, { status: 400 });
        }
        const isExpiry = validCoupon.expiry.getTime() < new Date().getTime();
        if (isExpiry) {
            return NextResponse.json({ message: 'Coupon expire', success: true }, { status: 400 });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return NextResponse.json({ message: 'Cart not found', success: true }, { status: 400 });
        }

        const totalAfterDiscount = (cart.cartTotal - (cart.cartTotal * validCoupon.discount) / 100).toFixed(2);

        const updatedCart = await Cart.findOneAndUpdate({ user: userId }, { totalAfterDiscount }, { new: true });

        return NextResponse.json({ updatedCart, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
