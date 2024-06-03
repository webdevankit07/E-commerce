import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    await ConnectDB();

    try {
        const { user, userId } = await validateToken(req);
        const { productId } = params;

        const isProductAlreadyAddedToWishlist = user.wishlist.find((id) => id.toString() === productId.toString());
        let updatedUser;
        if (isProductAlreadyAddedToWishlist) {
            updatedUser = await User.findByIdAndUpdate(userId, { $pull: { wishlist: productId } }, { new: true });
        } else {
            updatedUser = await User.findByIdAndUpdate(userId, { $push: { wishlist: productId } }, { new: true });
        }

        return NextResponse.json({ user: updatedUser, message: 'success', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while access wishlist route', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
