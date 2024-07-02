import AdminLayout from '@/components/Admin/AdminLayout';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
};

const layout = ({ children }: { children: ReactNode }) => {
    return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
