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
        const { shippingInfo, paymentInfo, orderItems, totalPrice, totalPriceAfterDiscount } = body;
        const { userId } = await validateToken(req);
        await validate(body, CreateOrderValidator);

        // const userCart = await Cart.findOne({ user: userId });
        // if (!userCart) return NextResponse.json({ message: 'User cart not found', success: true }, { status: 400 });

        // let finalAmout = 0;
        // if (body.couponApplied && userCart.totalAfterDiscount) {
        //     finalAmout = userCart.totalAfterDiscount;
        // } else {
        //     finalAmout = userCart.cartTotal;
        // }

        const order = await Order.create({
            user: userId,
            shippingInfo,
            paymentInfo,
            orderItems,
            totalPrice,
            totalPriceAfterDiscount,
        });

        // const update = userCart.products.map((item: any) => {
        //     return {
        //         updateOne: {
        //             filter: { _id: item.product._id },
        //             update: { $inc: { quantity: -item.count, sold: +item.count } },
        //         },
        //     };
        // });
        // await Product.bulkWrite(update, {});

        return NextResponse.json({ order, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
