import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import BlogCategory from '@/models/blogcategory.model';
import { CreateBlogCategorySchema } from '@/validators/categorySchemas';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        await validate(body, CreateBlogCategorySchema);
        const category = await BlogCategory.findOne({ title: body.title });
        if (category) {
            return NextResponse.json({ message: 'Category already exists', success: false }, { status: 400 });
        }

        const newCategory = await BlogCategory.create(body);

        return NextResponse.json({ newCategory, message: 'New Blog category created', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while creating blog category', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
