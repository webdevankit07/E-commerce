import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Brand from '@/models/brand.model';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { brandId: string } }) => {
    await ConnectDB();

    try {
        const { brandId } = params;

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not admin', success: false }, { status: 400 });
        }

        const category = await Brand.findById(brandId);
        if (!category) {
            return NextResponse.json({ message: 'Brand does not exists', success: false }, { status: 400 });
        }

        const deletedBrand = await Brand.findByIdAndDelete(brandId);

        return NextResponse.json({ brand: deletedBrand, message: 'Brand deleted', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while deleting Brand', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
