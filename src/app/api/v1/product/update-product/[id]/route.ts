import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Product from '@/models/product.model';
import { UpdateProductSchema } from '@/validators/product/updateProductSchema';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ message: 'unauthorize access', success: false }, { status: 401 });

        await validate(body, UpdateProductSchema);

        let slug;
        if (body.title) slug = slugify(body.title);

        const existProduct = await Product.findOne({ slug });
        if (existProduct && existProduct.id !== id) {
            return NextResponse.json({ message: 'slug name already exist', success: false }, { status: 409 });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { ...body, slug }, { new: true });

        return NextResponse.json(
            { product: updatedProduct, message: 'Product created', success: true },
            { status: 200 }
        );
    } catch (error: any) {
        console.log('Error while updating product', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
