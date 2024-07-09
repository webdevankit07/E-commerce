import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Our Store',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <Suspense>{children}</Suspense>
        </main>
    );
};

export default RootLayout;
