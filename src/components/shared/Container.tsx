import { ReactNode } from 'react';

const Container = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={`container mx-auto max-w-[1500px] px-3 md:px-8 lg:px-16 ${className}`}>{children}</div>;
};

export default Container;
