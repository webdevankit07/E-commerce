import Header from '@/components/Header/Header';
import Footer from '@/components/shared/Footer';
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
