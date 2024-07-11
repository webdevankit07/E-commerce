'use client';
import { useEffect } from 'react';
import Container from '../shared/Container';
import ProductCard from './ProductCard';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllProducts, getPopularProducts } from '@/redux/features/product/productSlice';
import ProductCardSkeleton from '../skeleton/ProductCardSkeleton';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/app/globals.css';
import { Pagination } from 'swiper/modules';

const PopularProducts = () => {
    const { products, popularProducts, isLoading } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            if (!products.length) {
                await dispatch(getAllProducts());
            }
        })();
        if (!popularProducts.length) {
            dispatch(getPopularProducts());
        }
    }, [dispatch, products.length, popularProducts.length]);

    return (
        <section className='py-5 pb-10 bg-slate-100'>
            <Container>
                <h3 className='font-semibold mb-4 text-lg'>Our Popular Products</h3>
                {!popularProducts?.length || isLoading ? (
                    <div className='grid grid-cols-6 gap-4'>
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <Swiper
                        slidesPerView={6}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className='mySwiper'
                        style={{ paddingBottom: '60px' }}
                    >
                        {popularProducts?.map((product) => (
                            <SwiperSlide key={product._id}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </Container>
        </section>
    );
};

export default PopularProducts;
