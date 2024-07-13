import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Order from '@/models/order.model';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { id: orderId } = params;
        const { isAdmin } = await validateToken(req);

        if (!isAdmin) return NextResponse.json({ message: 'You are not Admin' }, { status: 400 });
        if (!body.status) return NextResponse.json({ message: 'status is required' }, { status: 400 });

        const order = await Order.findById(orderId).select('-__v');
        if (!order) return NextResponse.json({ message: 'Order not found', success: false }, { status: 400 });

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus: body.status }, { new: true })
            .select('-__v')
            .populate('products.product', 'title price images');

        return NextResponse.json({ order: updatedOrder, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
