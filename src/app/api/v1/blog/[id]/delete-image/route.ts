import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Blog from '@/models/blog.model';
import { deleteFromCloudinary } from '@/services/cloudinary/cloudinary';
import { DeleteImageValidator } from '@/validators/deleteImageSchema.validators';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: blogId } = params;
        const body = await req.json();
        const { public_id: imgId } = body;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }
        await validate(body, DeleteImageValidator);

        const product = await Blog.findById(blogId);
        if (!product) {
            return NextResponse.json({ message: 'Blog not found', success: false }, { status: 400 });
        }

        await deleteFromCloudinary(imgId);
        const images = product.images.filter((image) => image.public_id !== imgId);
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { images }, { new: true });

        return NextResponse.json({ blog: updatedBlog, message: 'success', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while deleting blog images', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
