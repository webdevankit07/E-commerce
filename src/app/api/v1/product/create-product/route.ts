import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import Product from '@/models/product.model';
import { CreateProductSchema } from '@/validators/product/createProduct.validator';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        await validate(body, CreateProductSchema);

        const existProduct = await Product.findOne({ slug: body.slug });
        if (existProduct)
            return NextResponse.json({ message: 'slug name already exist', success: false }, { status: 409 });

        const createdProduct = await Product.create(body);

        return NextResponse.json({ success: true, message: 'Product created' }, { status: 201 });
    } catch (error: any) {
        console.log('Error while creating product', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
