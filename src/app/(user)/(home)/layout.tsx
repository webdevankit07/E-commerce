import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex-1'>{children}</div>
            <Footer />
        </main>
    );
};

export default RootLayout;
