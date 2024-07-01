'use client';
import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '@/hooks/storeHooks';
import { useRouter } from 'next/navigation';

const ValidateAdmin = ({ children }: { children: ReactNode }) => {
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (user === null || user.role !== 'admin') {
            router.push('/');
        } else {
            router.push('/admin/dashboard');
        }
    }, [user, router]);

    if (user === null || user.role !== 'admin') {
        return <main>Loading...</main>;
    } else {
        return <main>{children}</main>;
    }
};

export default ValidateAdmin;
