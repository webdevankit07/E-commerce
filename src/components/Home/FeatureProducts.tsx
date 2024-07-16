'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import Container from '../shared/Container';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import { getAllProducts, getFeaturedProducts } from '@/redux/features/product/productSlice';

// ! Swiper..*:
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/app/globals.css';
import { Pagination } from 'swiper/modules';
import ProductCardSkeleton from '../skeleton/ProductCardSkeleton';
import Link from 'next/link';

const FeatureProducts = () => {
    const { products, featuredProducts, isLoading } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            if (!products.length) {
                await dispatch(getAllProducts());
            }
        })();
        if (!featuredProducts.length) {
            dispatch(getFeaturedProducts());
        }
    }, [dispatch, products.length, featuredProducts.length]);

    return (
        <section className='py-5 pb-10 bg-slate-100'>
            <Container>
                <h3 className='flex justify-between items-center font-semibold mb-4 text-lg'>
                    <span>Featured Collection</span>
                    <Link
                        href={'/products'}
                        className='bg-yellow-950 hover:bg-yellow-950 text-sm text-white px-4 py-2 rounded'
                    >
                        Vew All
                    </Link>
                </h3>
                {!featuredProducts?.length || isLoading ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <Swiper
                        slidesPerView={1}
                        breakpoints={{
                            440: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                            1280: {
                                slidesPerView: 6,
                                spaceBetween: 10,
                            },
                        }}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className='mySwiper'
                        style={{ paddingBottom: '40px' }}
                    >
                        {featuredProducts.map((product) => (
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

export default FeatureProducts;
