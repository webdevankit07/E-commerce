import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/user.model';

export const validateToken = async (req: NextRequest) => {
    try {
        const access_token = req.cookies.get('access_token')?.value || '';
        const refresh_token = req.cookies.get('refresh_token')?.value || '';
        const decodedAccessTokenData: any =
            access_token && jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET as string);

        if (!decodedAccessTokenData) throw new Error('Invalid token');
        if (!refresh_token) throw new Error('No refresh token');

        const user = await User.findById(decodedAccessTokenData._id);
        if (!user) throw new Error('unauthorized request');

        return { user, userId: user._id, isAdmin: user.role === 'admin' ? true : false, refreshToken: refresh_token };
    } catch (error: any) {
        throw new Error(error.message);
    }
};
