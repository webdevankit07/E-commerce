import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import BlogCategory from '@/models/blogcategory.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const categories = await BlogCategory.find().select('-__v');
        if (!categories) {
            return NextResponse.json({ message: 'no category exists', success: false }, { status: 400 });
        }

        return NextResponse.json({ categories, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while geting blog category', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
