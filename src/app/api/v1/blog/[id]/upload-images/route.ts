import { ConnectDB } from '@/config/connectDB';
import { uploadImages } from '@/helpers/uploadImages';
import { validateToken } from '@/helpers/validateToken';
import Blog from '@/models/blog.model';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: blogId } = params;
        const formData = await req.formData();
        const images = formData.getAll('images') as unknown as File[];

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return NextResponse.json({ message: 'Blog not found', success: false }, { status: 400 });
        }

        const imageUrls = await uploadImages(images, 'images/blogs');
        console.log(imageUrls);

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { $push: { images: imageUrls } }, { new: true });

        return NextResponse.json({ blog: updatedBlog, message: 'success', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while uploading blog images', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
