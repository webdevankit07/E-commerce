import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Color from '@/models/color.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const colors = await Color.find().select('-__v');
        if (!colors) {
            return NextResponse.json({ message: 'no color name exists', success: false }, { status: 400 });
        }

        return NextResponse.json({ colors, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while geting color name', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
