import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Brand from '@/models/brand.model';
import { CreateBrandSchema } from '@/validators/brand/brandSchema';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        await validate(body, CreateBrandSchema);

        const brand = await Brand.findOne({ name: body.name });
        if (brand) {
            return NextResponse.json({ message: 'Brand name already exists', success: false }, { status: 400 });
        }

        const newBrand = await Brand.create(body);

        return NextResponse.json({ newBrand, message: 'New Brand name created', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while creating Brand name', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
