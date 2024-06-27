import React from 'react';
import Container from '../shared/Container';
import SpecialProduct from './SpecialProduct';

const SpecialProducts = () => {
    return (
        <section className='py-5 pb-10 bg-slate-100'>
            <Container>
                <h3 className='font-semibold mb-4 text-lg'>Special Products</h3>
                <div className='grid gap-5 grid-cols-3'>
                    <SpecialProduct />
                    <SpecialProduct />
                    <SpecialProduct />
                    <SpecialProduct />
                    <SpecialProduct />
                    <SpecialProduct />
                </div>
            </Container>
        </section>
    );
};

export default SpecialProducts;
