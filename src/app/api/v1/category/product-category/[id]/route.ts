import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import ProductCategory from '@/models/productcategory.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: categoryId } = params;

        const category = await ProductCategory.findById(categoryId);
        if (!category) {
            return NextResponse.json({ message: 'Category does not exists', success: false }, { status: 400 });
        }

        return NextResponse.json({ category, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while geting product category', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
