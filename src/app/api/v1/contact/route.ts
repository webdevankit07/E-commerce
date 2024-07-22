import { ConnectDB } from '@/config/connectDB';
import { contactMail } from '@/helpers/contactMail';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { name, email, mobile, comment } = await req.json();

        if (name && email && mobile && comment) {
            await contactMail(name, email, mobile, comment);
            return NextResponse.json({ message: 'token send to your email', success: true }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'All feilds are required', success: true }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
