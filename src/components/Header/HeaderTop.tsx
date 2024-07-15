import React from 'react';
import Container from '../shared/Container';

const HeaderTop = () => {
    return (
        <div className='py-3 border-b border-b-dark-2 hidden sm:block'>
            <Container>
                <div className='flex justify-between text-xs md:text-sm'>
                    <p>Free shiping Over $100 & Free Returns</p>
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
