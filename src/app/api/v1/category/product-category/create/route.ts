import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import ProductCategory from '@/models/productcategory.model';
import { CreateProductCategoryValidator } from '@/validators/categorySchema.validators';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        await validate(body, CreateProductCategoryValidator);

        const category = await ProductCategory.findOne({ title: body.title });
        if (category) {
            return NextResponse.json({ message: 'Category already exists', success: false }, { status: 400 });
        }

        const newCategory = await ProductCategory.create(body);

        return NextResponse.json(
            { newCategory, message: 'New Product category created', success: true },
            { status: 200 }
        );
    } catch (error: any) {
        console.log('Error while creating Product category', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
