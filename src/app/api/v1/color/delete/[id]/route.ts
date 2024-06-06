import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Color from '@/models/color.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: colorId } = params;

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        const category = await Color.findById(colorId);
        if (!category) {
            return NextResponse.json({ message: 'Color does not exists', success: false }, { status: 400 });
        }

        const deletedColor = await Color.findByIdAndDelete(colorId);

        return NextResponse.json({ color: deletedColor, message: 'Color deleted', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while deleting Color', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
