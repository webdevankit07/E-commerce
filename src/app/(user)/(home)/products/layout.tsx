import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Our Store',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return <main>{children}</main>;
};

export default RootLayout;
