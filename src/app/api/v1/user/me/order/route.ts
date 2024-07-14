import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Order from '@/models/order.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { userId } = await validateToken(req);

        const myOrders = await Order.find({ user: userId })
            .select('-__v')
            .populate('orderItems.product', 'title price images')
            .populate('user', 'firstname lastname username email mobile');
        if (!myOrders || myOrders.length === 0) {
            return NextResponse.json({ message: 'You have no orders', success: false }, { status: 400 });
        }

        return NextResponse.json({ myOrders, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
