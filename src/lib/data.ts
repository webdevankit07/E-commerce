import { CategoryType, ServiceType } from '@/types';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { LuGift } from 'react-icons/lu';
import { ImHeadphones } from 'react-icons/im';
import { BiSolidOffer } from 'react-icons/bi';
import { FaRegCreditCard } from 'react-icons/fa';

export const IndianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
];

export const countries = ['India'];

export const services: ServiceType[] = [
    { Icon: LiaShippingFastSolid, title: 'Free Shipping', subtitle: 'From all orders over $5' },
    { Icon: LuGift, title: 'Daily Surprise Offer', subtitle: 'Save upto 25% off' },
    { Icon: ImHeadphones, title: 'Support 24/7', subtitle: 'Shop with an expert' },
    { Icon: BiSolidOffer, title: 'Affordable Prices', subtitle: 'Get Factory Default Price' },
    { Icon: FaRegCreditCard, title: 'Secure Payment', subtitle: '100% Protected Payment' },
];

export const categories: CategoryType[] = [
    {
        title: 'Computers & Laptop',
        details: '10 Items',
        imgUrl: 'laptop.webp',
        location: '/products?category=Computers&Laptop',
    },
    {
        title: 'Cameras & videos',
        details: '10 Items',
        imgUrl: 'camera.webp',
        location: '/products?category=Cameras&videos',
    },
    {
        title: 'Smart Television',
        details: '10 Items',
        imgUrl: 'tv.jpg',
        location: '/products?category=Smart&Television',
    },
    {
        title: 'Smart Watches',
        details: '10 Items',
        imgUrl: 'watch.webp',
        location: '/products?category=Smart&Watches',
    },
    {
        title: 'Music & Gaming',
        details: '10 Items',
        imgUrl: 'headphones.webp',
        location: '/products?category=Music&Gaming',
    },
    {
        title: 'Mobiles & Tablets',
        details: '10 Items',
        imgUrl: 'headphone.webp',
        location: '/products?category=Mobiles&Tablets',
    },
    {
        title: 'Headphones',
        details: '10 Items',
        imgUrl: 'phone.jpg',
        location: '/products?category=Headphones',
    },
    {
        title: 'Accessories',
        details: '10 Items',
        imgUrl: 'accessories.jpg',
        location: '/products?category=Accessories',
    },
    {
        title: 'Portable Speakers',
        details: '10 Items',
        imgUrl: 'speaker.webp',
        location: '/products?category=Portable Speakers',
    },
    {
        title: 'Home Appliance',
        details: '10 Items',
        imgUrl: 'home-appliance.jpg',
        location: '/products?category=Home Appliance',
    },
];
