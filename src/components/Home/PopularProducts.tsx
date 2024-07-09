'use client';
import { useEffect } from 'react';
import Container from '../shared/Container';
import ProductCard from './ProductCard';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getClientProducts } from '@/redux/features/product/productSlice';
import Loading from '../shared/Loading';

const PopularProducts = () => {
    const { clientProducts, isLoading } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            if (!clientProducts) {
                await dispatch(getClientProducts(''));
            }
        })();
    }, [dispatch, clientProducts]);

    return (
        <section className='py-5 pb-10 bg-slate-100'>
            <Container>
                <h3 className='font-semibold mb-4 text-lg'>Our Popular Products</h3>
                {!clientProducts?.products.length || isLoading ? (
                    <Loading />
                ) : (
                    <div className='grid gap-5 grid-cols-6'>
                        {clientProducts?.products.map((product, index) => (
                            <>
                                <ProductCard product={product} />
                            </>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
};

export default PopularProducts;
