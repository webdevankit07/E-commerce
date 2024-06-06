import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Enquiry from '@/models/enq.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const { id } = params;
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not Admin', success: false }, { status: 400 });
        }

        const enquiry = await Enquiry.findById(id).select('-__v');
        if (!enquiry) {
            return NextResponse.json({ message: 'Enquiry not found', success: false }, { status: 400 });
        }

        return NextResponse.json({ enquiry, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while creating the enquiry', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
