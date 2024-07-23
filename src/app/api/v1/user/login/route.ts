import { ConnectDB } from '@/config/connectDB';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { identifier, password } = body;

        const userExist = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

        if (userExist && (await userExist.isPasswordCorrect(password))) {
            const accessToken = userExist.genaratetAccessToken();

            const user = await User.findById(userExist._id)
                .select('firstname lastname username email mobile role wishlist compare')
                .populate('wishlist compare');

            const response = NextResponse.json(
                { user, message: 'User logged in successfully', success: true },
                { status: 200 }
            );
            response.cookies.set('access_token', accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24,
            });

            return response;
        } else {
            return NextResponse.json({ message: 'Invalid credentials', success: false }, { status: 400 });
        }
    } catch (error: any) {
        console.error('Error while login: ' + error.message);
        return Response.json({ message: error.message, success: false }, { status: 500 });
    }
};
