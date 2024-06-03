import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/user.model';

export const validateToken = async (req: NextRequest) => {
    try {
        const access_token = req.cookies.get('access_token')?.value || '';
        const refreshToken = req.cookies.get('refresh_token')?.value || '';
        const decodedAccessTokenData: any =
            access_token && jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET as string);

        if (!decodedAccessTokenData) throw new Error('Invalid token');
        if (!refreshToken) throw new Error('No refresh token');

        const user = await User.findById(decodedAccessTokenData._id);
        if (!user) throw new Error('unauthorized request');

        const userId = user._id;
        const isAdmin = user.role === 'admin';

        return { user, userId, isAdmin, refreshToken };
    } catch (error: any) {
        throw new Error(error.message);
    }
};
