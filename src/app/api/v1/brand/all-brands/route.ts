import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Brand from '@/models/brand.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const brands = await Brand.find().select('_id name');
        if (!brands) {
            return NextResponse.json({ message: 'no brand name exists', success: false }, { status: 400 });
        }

        return NextResponse.json({ brands, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while geting brand name', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
