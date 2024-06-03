import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import ProductCategory from '@/models/productcategory.model';
import { UpdateBlogCategorySchema } from '@/validators/category/categorySchema';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: categoryID } = params;
        const body = await req.json();
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        await validate(body, UpdateBlogCategorySchema);

        const category = await ProductCategory.findById(categoryID);
        if (!category) {
            return NextResponse.json({ message: 'Category not exists', success: false }, { status: 400 });
        }

        const updateCategory = await ProductCategory.findByIdAndUpdate(categoryID, body, { new: true });

        return NextResponse.json({ updateCategory, message: 'Category updated', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while updating product category', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
