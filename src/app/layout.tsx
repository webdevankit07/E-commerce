import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/redux/ReduxProvider';

const rubik = Rubik({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
    title: 'ShopWave',
    description: 'E-commerce app created by webdev ankit',
    icons: {
        icon: '/logo.png',
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='en'>
            <body className={rubik.className}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
