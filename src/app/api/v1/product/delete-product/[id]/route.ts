import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Product from '@/models/product.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ message: 'unauthorize access', success: false }, { status: 401 });

        const product = await Product.findByIdAndDelete(id).select('_id');

        return NextResponse.json(
            { productId: product?._id, message: 'Product deleted', success: true },
            { status: 200 }
        );
    } catch (error: any) {
        console.log('Error while deleting product', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
