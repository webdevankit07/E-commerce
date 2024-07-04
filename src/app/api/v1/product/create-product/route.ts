import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Product from '@/models/product.model';
import { CreateProductValidator } from '@/validators/productSchema.vaidators';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ message: 'unauthorize access', success: false }, { status: 401 });
        await validate(body, CreateProductValidator);

        const existProduct = await Product.findOne({ slug: body.slug });
        if (existProduct)
            return NextResponse.json({ message: 'slug name already exist', success: false }, { status: 409 });

        const slug = slugify(body.title);
        console.log(body);
        const product = await Product.create({ ...body, slug });

        return NextResponse.json({ product, success: true, message: 'Product created' }, { status: 201 });
    } catch (error: any) {
        console.log('Error while creating product', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
