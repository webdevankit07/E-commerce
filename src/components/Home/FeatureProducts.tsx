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
                <h3 className='font-semibold mb-4 text-lg'>Featured Collection</h3>
                {!featuredProducts?.length || isLoading ? (
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
