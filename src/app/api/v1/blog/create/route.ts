import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Blog from '@/models/blog.model';
import { CreateBlogValidator } from '@/validators/blogSchema.validators';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { isAdmin } = await validateToken(req);
        if (!isAdmin)
            return NextResponse.json({ message: 'Only admin can create the blog', success: false }, { status: 400 });

        await validate(body, CreateBlogValidator);

        const blog = await Blog.create(body);

        return NextResponse.json({ blog, message: 'Blog created', success: true }, { status: 201 });
    } catch (error: any) {
        console.log('Error while creating blog', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
