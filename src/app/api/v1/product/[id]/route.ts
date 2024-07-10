import { ConnectDB } from '@/config/connectDB';
import Product from '@/models/product.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const product = await Product.findById(params.id)
            .select('-__v')
            .populate('ratings.postedby', '_id firstname lastname username role');
        if (!product) return NextResponse.json({ message: 'Product not found', success: false }, { status: 400 });

        return NextResponse.json({ product, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while fetching all products', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
