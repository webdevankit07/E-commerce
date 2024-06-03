import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Brand from '@/models/brand.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id: brandId } = params;
        const brand = await Brand.findById(brandId).select('-__v');
        if (!brand) {
            return NextResponse.json({ message: 'Brand name does not exists', success: false }, { status: 400 });
        }

        return NextResponse.json({ brand, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while geting brand name', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
