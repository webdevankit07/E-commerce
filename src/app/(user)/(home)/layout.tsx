import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default RootLayout;
