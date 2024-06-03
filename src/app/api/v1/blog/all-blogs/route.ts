import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Blog from '@/models/blog.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ message: 'Only admin can access', success: false }, { status: 400 });

        const blogs = await Blog.find().select('-__v');

        return NextResponse.json({ blogs, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while Access blogs', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
