import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Order from '@/models/order.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not Admin' }, { status: 400 });
        }

        const orders = await Order.find({ orderby: id })
            .select('-__v')
            .populate('products.product', 'title price images');
        if (!orders || orders.length === 0) {
            return NextResponse.json({ message: 'No orders found', success: false }, { status: 400 });
        }

        return NextResponse.json({ orders, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
