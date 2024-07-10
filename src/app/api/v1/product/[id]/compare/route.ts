import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { userId } = await validateToken(req);
        const { id: productId } = params;

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not exist', success: false }, { status: 400 });
        }

        const isProductAlreadyAddedToWishlist = user.compare.find((id) => id.toString() === productId.toString());
        let updatedUser;
        if (isProductAlreadyAddedToWishlist) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { compare: productId } },
                { new: true }
            ).populate('wishlist compare');
        } else {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { compare: productId } },
                { new: true }
            ).populate('wishlist compare');
        }

        return NextResponse.json({ user: updatedUser, message: 'success', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while access wishlist route', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
