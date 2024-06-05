import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Cart from '@/models/cart.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { userId } = await validateToken(req);

        const cart = await Cart.findOne({ orderby: userId });
        if (!cart) {
            return NextResponse.json({ message: 'Cart not found', success: false }, { status: 400 });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { orderby: userId },
            { products: [], cartTotal: 0, totalCartProducts: 0 },
            { new: true }
        ).select('-__v -createdAt -updatedAt');

        return NextResponse.json({ cart: updatedCart, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
