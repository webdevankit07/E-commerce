import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import BlogCategory from '@/models/blogcategory.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: categoryID } = params;

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        const category = await BlogCategory.findById(categoryID);
        if (!category) {
            return NextResponse.json({ message: 'Category not exists', success: false }, { status: 400 });
        }

        const deletedcategory = await BlogCategory.findByIdAndDelete(categoryID);

        return NextResponse.json({ deletedcategory, message: 'Category deleted', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while updating blog category', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
