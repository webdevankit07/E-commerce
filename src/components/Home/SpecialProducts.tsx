'use client';
import Container from '../shared/Container';
import SpecialProduct from './SpecialProduct';
import { useAppSelector } from '@/hooks/storeHooks';

const SpecialProducts = () => {
    const { popularProducts } = useAppSelector((state) => state.product);

    return (
        <section className='py-5 pb-10 bg-slate-100'>
            <Container>
                <h3 className='font-semibold mb-4 text-lg'>Special Products</h3>
                <div className='grid gap-5 grid-cols-3'>
                    {popularProducts.slice(0, 6).map((product) => (
                        <SpecialProduct product={product} key={product._id} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default SpecialProducts;
