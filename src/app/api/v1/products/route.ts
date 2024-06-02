import { ConnectDB } from '@/config/connectDB';

export const GET = async (req: Request) => {
    await ConnectDB();

    try {
        return Response.json({ messge: 'success', success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
    }
};
