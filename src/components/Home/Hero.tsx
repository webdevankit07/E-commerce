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
                        <Image src={'/images/banner (4).jpg'} layout='fill' alt='main-banner' objectFit='conatin' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (5).jpg'} layout='fill' alt='main-banner' objectFit='conatin' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (2).jpg'} layout='fill' alt='main-banner' objectFit='conatin' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (3).jpg'} layout='fill' alt='main-banner' objectFit='conatin' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (1).jpg'} layout='fill' alt='main-banner' objectFit='conatin' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={'/images/banner (1).png'} layout='fill' alt='main-banner' objectFit='conatin' />
                    </SwiperSlide>
                </Swiper>
            </Container>
        </div>
    );
};

export default Hero;
