'use client';
import AdminLayout from '@/components/Admin/AdminLayout';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
    return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
