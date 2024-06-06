import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Color from '@/models/color.model';
import { CreateColorSchema } from '@/validators/colorSchema.validator';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        await validate(body, CreateColorSchema);

        const color = await Color.findOne({ name: body.name });
        if (color) {
            return NextResponse.json({ message: 'Color name already exists', success: false }, { status: 400 });
        }

        const newColor = await Color.create(body);

        return NextResponse.json({ newColor, message: 'New Color name created', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while creating Color name', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
