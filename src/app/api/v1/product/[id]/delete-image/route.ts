import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Product from '@/models/product.model';
import { deleteFromCloudinary } from '@/utils/cloudinary';
import { DeleteImageSchema } from '@/validators/deleteImageSchema';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: productId } = params;
        const body = await req.json();
        const { public_id: imgId } = body;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }
        await validate(body, DeleteImageSchema);

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({ message: 'Product not found', success: false }, { status: 400 });
        }

        await deleteFromCloudinary(imgId);
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $pull: { images: { public_id: imgId } } },
            { new: true }
        );

        return NextResponse.json({ product: updatedProduct, message: 'success', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while deleting product images', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
