import { ConnectDB } from '@/config/connectDB';
import { uploadImages } from '@/helpers/uploadImages';
import { validateToken } from '@/helpers/validateToken';
import Product from '@/models/product.model';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: productId } = params;
        const formData = await req.formData();
        const images = formData.getAll('images') as unknown as File[];

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({ message: 'Product not found', success: false }, { status: 400 });
        }

        const imageUrls = await uploadImages(images, 'images/products');

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $push: { images: imageUrls } },
            { new: true }
        );

        return NextResponse.json({ product: updatedProduct, message: 'success', success: false }, { status: 200 });
        // return NextResponse.json({ product: updatedProduct, message: 'success', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while uploading product images', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
