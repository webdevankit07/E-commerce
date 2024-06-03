import { ConnectDB } from '@/config/connectDB';
import { sendEmail } from '@/helpers/mailer';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB()
    
    try {
        const body = await req.json();

        const user = await User.findOne({ email: body.email });
        if (!user)
            return NextResponse.json({ message: 'User not found with this email', success: false }, { status: 400 });

        const token = await user.genaratetPasswordResetToken();
        await user.save();

        await sendEmail(user.email, user.username, token);

        return NextResponse.json({ message: 'token send to your email', success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
