import ProfileLayout from '@/components/My Account/ProfileLayout';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'My Account',
};

const layout = ({ children }: { children: ReactNode }) => {
    return <ProfileLayout>{children}</ProfileLayout>;
};

export default layout;
