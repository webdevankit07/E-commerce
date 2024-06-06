import { ConnectDB } from '@/config/connectDB';
import { validate } from '@/helpers/validateData';
import { validateToken } from '@/helpers/validateToken';
import Enquiry from '@/models/enq.model';
import { UpdateEnqValidator } from '@/validators/enuirySchema.validators';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await ConnectDB();

    try {
        const body = await req.json();
        const { id } = params;

        const { isAdmin } = await validateToken(req);
        if (!isAdmin) {
            return NextResponse.json({ message: 'You are not Admin', success: false }, { status: 400 });
        }
        await validate(body, UpdateEnqValidator);

        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return NextResponse.json({ message: 'Enquiry not found', success: false }, { status: 400 });
        }

        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            id,
            {
                name: enquiry.name,
                email: enquiry.email,
                mobile: enquiry.mobile,
                comment: enquiry.comment,
                status: enquiry.status,
                ...body,
            },
            { new: true }
        );

        return NextResponse.json({ enquiry: updatedEnquiry, message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while updating enquiry', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
