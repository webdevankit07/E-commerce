import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Color from '@/models/color.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: colorId } = params;
        const color = await Color.findById(colorId).select('-__v');
        if (!color) {
            return NextResponse.json({ message: 'Color name does not exists', success: false }, { status: 400 });
        }

        return NextResponse.json({ color, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while geting color name', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
