import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Cart from '@/models/cart.model';
import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/product.model';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { userId } = await validateToken(req);

        await Product.countDocuments();
        const cart = await Cart.findOne({ user: userId })
            .populate('products.product', '_id title price images')
            .select('-__v -createdAt -updatedAt');
        if (!cart) {
            return NextResponse.json({ message: 'Cart not found', success: false }, { status: 400 });
        }

        return NextResponse.json({ cart, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
