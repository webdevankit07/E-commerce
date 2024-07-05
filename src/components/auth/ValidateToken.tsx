'use client';
import { Axios } from '@/config/axios';
import { useAppDispatch } from '@/hooks/storeHooks';
import { setCurrentUser } from '@/redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const ValidateToken = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await Axios.get('/auth/validateToken');
                dispatch(setCurrentUser(data.user));
            } catch (error) {
                dispatch(setCurrentUser(null));
                router.push('/');
            }
        })();
    }, [dispatch, router]);

    return <main>{children}</main>;
};

export default ValidateToken;
