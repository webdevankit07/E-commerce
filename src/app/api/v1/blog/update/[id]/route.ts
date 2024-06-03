import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Blog from '@/models/blog.model';
import { UpdateBlogSchema } from '@/validators/blog/updateBlogSchema';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin)
            return NextResponse.json({ message: 'Only admin can update the blog', success: false }, { status: 400 });
        await validate(body, UpdateBlogSchema);

        const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });

        return NextResponse.json({ updatedBlog, message: 'Blog updated', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while updating blog', error.messsage);
        return NextResponse.json({ message: error.messsage, success: false }, { status: 500 });
    }
};
