import AdminLayout from '@/components/Admin/AdminLayout';
import ValidateAdmin from '@/components/Admin/ValidateAdmin';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
};

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <ValidateAdmin>
            <AdminLayout>{children}</AdminLayout>
        </ValidateAdmin>
    );
};

export default layout;
