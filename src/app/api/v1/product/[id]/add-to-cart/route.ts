import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Cart from '@/models/cart.model';
import Product from '@/models/product.model';
import User from '@/models/user.model';
import { AddToCartValidator, CartProduct } from '@/validators/cartSchema.validatrors';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { userId } = await validateToken(req);
        await validate(body, AddToCartValidator);

        const { id: productId } = params;
        const currProduct = await Product.findById(productId).select('price');
        if (!currProduct) {
            return NextResponse.json({ message: 'ProductId invalid', success: false }, { status: 400 });
        }

        const newProduct = { product: productId, count: body.count, color: body.color, price: currProduct.price };

        const cartAlreadyExist = await Cart.findOne({ user: userId });
        if (!cartAlreadyExist) {
            const cartTotal = currProduct.price * body.count;
            const totalCartProducts = newProduct.count;

            const newCart = await Cart.create({
                products: [newProduct],
                cartTotal,
                totalCartProducts,
                user: userId,
            });

            const updatedUser = await User.findByIdAndUpdate(userId, { cart: newCart._id }, { new: true })
                .populate('cart')
                .select('username cart');
            return NextResponse.json(
                { user: updatedUser, message: 'Products added to cart', success: true },
                { status: 200 }
            );
        } else {
            const existingCartProducts = cartAlreadyExist.products;
            let allProducts = [];
            const productIdMatched = existingCartProducts.filter(
                (Product) => Product.product.toString() === productId.toString() && Product.color === body.color
            );

            if (productIdMatched.length > 0) {
                allProducts = existingCartProducts.map((product) => {
                    if (product.product.toString() === productId.toString()) {
                        return {
                            product: productId,
                            color: body.color,
                            price: currProduct.price,
                            count: product.count + body.count,
                        };
                    }
                    return product;
                });
            } else {
                allProducts = [...existingCartProducts, newProduct];
            }

            const cartTotal = allProducts
                .map((product) => product.count * product.price)
                .reduce((acc, price) => acc + price, 0);
            const totalCartProducts = allProducts.reduce((sum, product) => sum + product.count, 0);

            await Cart.findByIdAndUpdate(
                cartAlreadyExist._id,
                { products: allProducts, totalCartProducts, cartTotal },
                { new: true }
            );

            const updatedUser = await User.findById(userId).populate('cart').select('username cart');
            return NextResponse.json(
                { user: updatedUser, message: 'Products added to cart', success: true },
                { status: 200 }
            );
        }
    } catch (error: any) {
        console.log('Error while adding cart product: ', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
