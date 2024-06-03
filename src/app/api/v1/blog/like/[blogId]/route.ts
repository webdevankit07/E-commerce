import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Blog from '@/models/blog.model';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { blogId: string } }) => {
    await ConnectDB();

    try {
        const { blogId } = params;
        const { userId } = await validateToken(req);

        const blog = await Blog.findById(blogId);
        let resBlog;

        const isUserAlreadyDislikedPost = blog?.dislikes.find((id) => id.toString() === userId?.toString());
        if (isUserAlreadyDislikedPost) {
            resBlog = await Blog.findByIdAndUpdate(
                blogId,
                { $pull: { dislikes: userId }, isDisliked: false },
                { new: true }
            );
        }

        const isPostLiked = blog?.isLiked;
        if (isPostLiked) {
            resBlog = await Blog.findByIdAndUpdate(blogId, { $pull: { likes: userId }, isLiked: false }, { new: true });
        } else {
            resBlog = await Blog.findByIdAndUpdate(blogId, { $push: { likes: userId }, isLiked: true }, { new: true });
        }

        return NextResponse.json({ blog: resBlog, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while like the blog post', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
