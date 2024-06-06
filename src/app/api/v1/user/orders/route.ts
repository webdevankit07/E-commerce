import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Order from '@/models/order.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not Admin' }, { status: 400 });
        }

        const orders = await Order.find()
            .select('-__v')
            .populate('products.product', 'title price images')
            .populate('orderby', 'username email mobile role');
        if (!orders) {
            return NextResponse.json({ message: 'You have no orders', success: false }, { status: 200 });
        }

        return NextResponse.json({ orders, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
