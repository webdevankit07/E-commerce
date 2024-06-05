import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Cart from '@/models/cart.model';
import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/product.model';
import { validate } from '@/helpers/validateData';
import { updateCartProductValidator } from '@/validators/cartSchema.validatrors';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { id: cartProductId } = params;
        const { userId } = await validateToken(req);
        await validate(body, updateCartProductValidator);

        const cart = await Cart.findOne({ orderby: userId });
        if (!cart) {
            return NextResponse.json({ message: 'Cart not found', success: false }, { status: 400 });
        }

        const updatedCartProducts = cart.products.map((product) => {
            if (product._id.toString() === cartProductId) {
                return {
                    product: product.product,
                    count: body.count,
                    color: body.color,
                    price: product.price,
                    _id: cartProductId,
                };
            }
            return product;
        });
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
