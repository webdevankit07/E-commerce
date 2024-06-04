import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { UpdateAddressSchema } from '@/validators/user/addressSchemas';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id } = params;
        const { userId } = await validateToken(req);
        const body = await req.json();
        const { city, state, country, postalCode } = body;
        await validate(body, UpdateAddressSchema);

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'user not found', success: false }, { status: 400 });
        }
        const updatedAddress = user.address.map((addr) => {
            if (addr._id.toString() === id) {
                const updateData = {
                    city: addr.city,
                    state: addr.state,
                    country: addr.country,
                    postalCode: addr.postalCode,
                    ...body,
                };
                return updateData;
            }
            return addr;
        });

        const updatedUser = await User.findByIdAndUpdate(userId, { address: updatedAddress }, { new: true });

        return NextResponse.json({ user: updatedUser, message: 'address deleted', success: false }, { status: 200 });
    } catch (error: any) {
        console.log('Error while saving user address:', error);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
