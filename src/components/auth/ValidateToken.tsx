'use client';
import { Axios, handleAxiosError } from '@/config/axios';
import { useAppDispatch } from '@/hooks/storeHooks';
import { setCurrentUser } from '@/redux/features/auth/authSlice';
import { ReactNode, useEffect } from 'react';

const ValidateToken = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();

    const validateToken = async () => {
        try {
            const { data } = await Axios.get('/auth/validateToken');
            dispatch(setCurrentUser(data.user));
        } catch (error) {
            const err = await handleAxiosError(error);
            dispatch(setCurrentUser(null));
        }
    };

    useEffect(() => {
        validateToken();
    }, []);

    return <main>{children}</main>;
};

export default ValidateToken;
