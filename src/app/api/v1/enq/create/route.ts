import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Enquiry from '@/models/enq.model';
import { CreateEnqValidator } from '@/validators/enuirySchema.validators';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { isAdmin } = await validateToken(req);
        if (!isAdmin) return NextResponse.json({ message: 'You are not Admin', success: false }, { status: 400 });
        await validate(body, CreateEnqValidator);

        const enquiry = await Enquiry.create(body);

        return NextResponse.json({ enquiry, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while creating enquiry', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
