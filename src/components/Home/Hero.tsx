'use client';
import React from 'react';
import Container from '../shared/Container';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/app/globals.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { AspectRatio } from '../ui/aspect-ratio';

const Hero = () => {
    return (
        <section className='py-5'>
            <Container>
                <Swiper
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className='rounded-md overflow-hidden'
                >
                    <SwiperSlide>
                        <AspectRatio ratio={16 / 4}>
                            <Image src={'/images/banner (4).jpg'} fill priority alt='main-banner' />
                        </AspectRatio>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AspectRatio ratio={16 / 4}>
                            <Image src={'/images/banner (5).jpg'} fill alt='main-banner' />
                        </AspectRatio>
                    </SwiperSlide>
                    <SwiperSlide className=''>
                        <AspectRatio ratio={16 / 4}>
                            <Image src={'/images/banner (2).jpg'} fill alt='main-banner' />
                        </AspectRatio>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AspectRatio ratio={16 / 4}>
                            <Image src={'/images/banner (3).jpg'} fill alt='main-banner' />
                        </AspectRatio>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AspectRatio ratio={16 / 4}>
                            <Image src={'/images/banner (1).jpg'} fill alt='main-banner' />
                        </AspectRatio>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AspectRatio ratio={16 / 4}>
                            <Image src={'/images/banner (1).png'} fill alt='main-banner' />
                        </AspectRatio>
                    </SwiperSlide>
                </Swiper>
            </Container>
        </section>
    );
};

export default Hero;
