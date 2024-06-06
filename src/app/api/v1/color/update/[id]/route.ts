import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Color from '@/models/color.model';
import { UpdateColorValidator } from '@/validators/colorSchema.validator';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: colorId } = params;
        const body = await req.json();

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        await validate(body, UpdateColorValidator);
        console.log(colorId);

        const color = await Color.findById(colorId);
        if (!color) {
            return NextResponse.json({ message: 'color name does not exists', success: false }, { status: 400 });
        }

        const updatedColorName = await Color.findByIdAndUpdate(colorId, body, { new: true });

        return NextResponse.json(
            { color: updatedColorName, message: 'Color name updated', success: true },
            { status: 200 }
        );
    } catch (error: any) {
        console.log('Error while updating product category', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
