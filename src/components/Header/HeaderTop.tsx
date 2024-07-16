import React from 'react';
import Container from '../shared/Container';
import Link from 'next/link';

const HeaderTop = () => {
    return (
        <div className='py-3 border-b border-b-dark-2'>
            <Container>
                <div className='flex items-center justify-between text-xs md:text-sm'>
                    <h2 className='text-2xl font-semibold'>
                        <Link href={'/'}>ShopWave</Link>
                    </h2>
                    <div className='flex gap-5'>
                        <p>
                            Hotline:{' '}
                            <a href='tel:+91 9304661037' className='hover:underline'>
                                +91 9304661037
                            </a>
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeaderTop;
