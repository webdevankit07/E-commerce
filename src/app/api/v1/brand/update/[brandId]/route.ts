import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Brand from '@/models/brand.model';
import { UpdateBrandValidator } from '@/validators/brandSchema.validators';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { brandId: string } }) => {
    await ConnectDB();

    try {
        const { brandId } = params;
        const body = await req.json();

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        await validate(body, UpdateBrandValidator);

        const brand = await Brand.findById(brandId);
        if (!brand) {
            return NextResponse.json({ message: 'brand name does not exists', success: false }, { status: 400 });
        }

        const updatedBrandName = await Brand.findByIdAndUpdate(brandId, body, { new: true });

        return NextResponse.json(
            { brand: updatedBrandName, message: 'Brand name updated', success: true },
            { status: 200 }
        );
    } catch (error: any) {
        console.log('Error while updating product category', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
