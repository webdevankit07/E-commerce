import { validateToken } from '@/helpers/validateToken';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        await validateToken(req);
        return NextResponse.json({ message: 'success', success: true }, { status: 200 });
    } catch (error: any) {
        const res = NextResponse.json({ error: error.message }, { status: 500 });
        res.cookies.delete('access_token');
        res.cookies.delete('refresh_token');
        return res;
    }
};
