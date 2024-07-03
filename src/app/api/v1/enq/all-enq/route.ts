import { ConnectDB } from '@/config/connectDB';
import { validateToken } from '@/helpers/validateToken';
import Enquiry from '@/models/enq.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not Admin', success: false }, { status: 400 });
        }

        const enquiries = await Enquiry.find().select('-__v');

        return NextResponse.json({ enquiries, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while access the enquires', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
