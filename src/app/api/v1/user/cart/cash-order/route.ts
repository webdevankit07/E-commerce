import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Cart from '@/models/cart.model';
import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/product.model';
import Order from '@/models/order.model';
import uniqid from 'uniqid';
import { validate } from '@/helpers/validateData';
import { CreateOrderValidator } from '@/validators/orderSchema.validators';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { userId } = await validateToken(req);
        await validate(body, CreateOrderValidator);

        const userCart = await Cart.findOne({ user: userId });
        if (!userCart) return NextResponse.json({ message: 'User cart not found', success: true }, { status: 400 });

        let finalAmout = 0;
        if (body.couponApplied && userCart.totalAfterDiscount) {
            finalAmout = userCart.totalAfterDiscount;
        } else {
            finalAmout = userCart.cartTotal;
        }

        const newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: 'COD',
                amount: finalAmout,
                status: 'Cash on Delivery',
                created: Date.now(),
                currency: 'usd',
            },
            orderby: userId,
            orderStatus: 'Cash on Delivery',
        }).save();

        const update = userCart.products.map((item: any) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } },
                },
            };
        });
        await Product.bulkWrite(update, {});

        return NextResponse.json({ newOrder, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
