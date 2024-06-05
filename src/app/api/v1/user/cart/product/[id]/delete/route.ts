import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Cart from '@/models/cart.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: cartProductId } = params;
        const { userId } = await validateToken(req);

        const cart = await Cart.findOne({ orderby: userId });
        if (!cart) {
            return NextResponse.json({ message: 'Cart not found', success: false }, { status: 400 });
        }

        const updatedCartProducts = cart.products.filter((product) => product._id.toString() !== cartProductId);
        const cartTotal = updatedCartProducts
            .map((product) => product.count * product.price)
            .reduce((acc, price) => acc + price, 0);
        const totalCartProducts = updatedCartProducts.reduce((sum, product) => sum + product.count, 0);

        const updatedCart = await Cart.findOneAndUpdate(
            { orderby: userId },
            { products: updatedCartProducts, cartTotal, totalCartProducts },
            { new: true }
        )
            .populate('products.product', '_id title price images')
            .select('-__v -createdAt -updatedAt');

        return NextResponse.json({ cart: updatedCart, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
