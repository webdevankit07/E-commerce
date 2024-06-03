import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Blog from '@/models/blog.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin)
            return NextResponse.json({ message: 'Only admin can delete the blog', success: false }, { status: 400 });

        const deletedBlog = await Blog.findByIdAndDelete(id);

        return NextResponse.json({ deletedBlog, message: 'Blog successfully deleted', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while Access blogs', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
