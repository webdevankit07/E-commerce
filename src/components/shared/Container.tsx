import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
    return <div className='container mx-auto max-w-[1500px] px-3 md:px-8 lg:px-20'>{children}</div>;
};

export default Container;
