import { CategoryType, ServiceType } from '@/types';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { LuGift } from 'react-icons/lu';
import { ImHeadphones } from 'react-icons/im';
import { BiSolidOffer } from 'react-icons/bi';
import { FaRegCreditCard } from 'react-icons/fa';

export const services: ServiceType[] = [
    { Icon: LiaShippingFastSolid, title: 'Free Shipping', subtitle: 'From all orders over $5' },
    { Icon: LuGift, title: 'Daily Surprise Offer', subtitle: 'Save upto 25% off' },
    { Icon: ImHeadphones, title: 'Support 24/7', subtitle: 'Shop with an expert' },
    { Icon: BiSolidOffer, title: 'Affordable Prices', subtitle: 'Get Factory Default Price' },
    { Icon: FaRegCreditCard, title: 'Secure Payment', subtitle: '100% Protected Payment' },
];

export const categories: CategoryType[] = [
    { title: 'Computers & Laptop', details: '10 Items', imgUrl: 'laptop.webp', location: '/' },
    { title: 'Cameras & videos', details: '10 Items', imgUrl: 'camera.webp', location: '/' },
    { title: 'Smart Television', details: '10 Items', imgUrl: 'tv.jpg', location: '/' },
    { title: 'Smart Watches', details: '10 Items', imgUrl: 'watch.webp', location: '/' },
    { title: 'Music & Gaming', details: '10 Items', imgUrl: 'headphones.webp', location: '/' },
    { title: 'Mobiles & Tablets', details: '10 Items', imgUrl: 'headphone.webp', location: '/' },
    { title: 'Headphones', details: '10 Items', imgUrl: 'phone.jpg', location: '/' },
    { title: 'Accessories', details: '10 Items', imgUrl: 'accessories.jpg', location: '/' },
    { title: 'Portable Speakers', details: '10 Items', imgUrl: 'speaker.webp', location: '/' },
    { title: 'Home Appliance', details: '10 Items', imgUrl: 'home-appliance.jpg', location: '/' },
];
