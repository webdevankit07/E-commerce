import { ReactNode } from 'react';

const ListHeading = ({ children }: { children: ReactNode }) => {
    return <h4 className='mb-4 font-semibold'>{children}</h4>;
};

export default ListHeading;
