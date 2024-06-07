import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/redux/ReduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'E-commerce',
    description: 'E-commerce app created by webdev ankit',
    icons: {
        icon: '/logo.png',
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
