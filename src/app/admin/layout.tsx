import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata: Metadata = {
    title: 'ShopWave | Admin Pannel',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <main className={roboto.className}>{children}</main>;
}
