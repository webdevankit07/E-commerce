'use client';
import React from 'react';
import Container from '../shared/Container';
import Image from 'next/image';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/app/globals.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Hero = () => {
    return (
        <div className='py-5'>
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
                    className='rounded-md h-[350px]'
                >
                    <SwiperSlide>
                        <Image src={'/images/banner (4).jpg'} fill priority alt='main-banner' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (5).jpg'} fill alt='main-banner' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (2).jpg'} fill alt='main-banner' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (3).jpg'} fill alt='main-banner' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (1).jpg'} fill alt='main-banner' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (1).png'} fill alt='main-banner' />
                    </SwiperSlide>
                </Swiper>
            </Container>
        </div>
    );
};

export default Hero;
