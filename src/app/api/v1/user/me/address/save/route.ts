import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import User from '@/models/user.model';
import { SaveAddressValidator } from '@/validators/user/addressSchemas.validators';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { userId } = await validateToken(req);
        await validate(body, SaveAddressValidator);

        const user = await User.findByIdAndUpdate(userId, { $push: { address: body } }, { new: true });

        return NextResponse.json(
            { user, message: 'user details successfully updated', success: false },
            { status: 200 }
        );
    } catch (error: any) {
        console.log('Error while saving user address:', error);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
