'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import ReactStars from 'react-stars';

const CompareProductCard = () => {
    const handleRating = () => {};

    return (
        <div className={`drop-shadow rounded-md p-4 bg-white w-[250px] overflow-hidden`}>
            <div className={`group  justify-center items-center relative`}>
                <Link href={'/'}>
                    <div className={`h-[150px] w-auto`}>
                        <Image
                            src={'/images/headphones.webp'}
                            fill
                            sizes='100%'
                            alt='product-image'
                            className='group-hover:opacity-0 transition duration-500'
                        />
                        <Image
                            src={'/images/headphone.webp'}
                            fill
                            sizes='100%'
                            alt='product-image'
                            className='opacity-0 group-hover:opacity-100 transition duration-500'
                        />
                    </div>
                </Link>
                <div className={`text-right absolute -right-2 -top-2 text-lg cursor-pointer`} onClick={() => {}}>
                    <RxCross1 className='text-2xl hover:bg-slate-700 p-1 hover:text-slate-50 rounded-full transition duration-150' />
                </div>
            </div>
            <div className='py-2 space-y-1'>
                <h6 className='text-[#bf4800] text-[13px] font-medium'>Headphone</h6>
                <p className='text-xs font-medium text-slate-900 hover:underline'>
                    Kids Headphones bulk 10 pack multi colored for students
                </p>
                <ReactStars count={5} value={4.5} onChange={handleRating} size={20} color2={'#ffd700'} edit={false} />
                <p className='text-sm font-semibold text-slate-900 py-2'>₹1200</p>
                <div className='pb-3'>
                    <div className='flex justify-between mb-2'>
                        <span className='text-sm font-medium'>Brand: </span>
                        <span className='text-xs font-medium text-slate-600'>Havells</span>
                    </div>
                    <hr />
                </div>
                <div className='pb-3'>
                    <div className='flex justify-between mb-2'>
                        <span className='text-sm font-medium'>Type: </span>
                        <span className='text-xs font-medium text-slate-600'>SmartPhone</span>
                    </div>
                    <hr />
                </div>
                <div className='pb-3'>
                    <div className='flex justify-between mb-2'>
                        <span className='text-sm font-medium'>Availablity: </span>
                        <span className='text-xs font-medium text-slate-600'>In Stock</span>
                    </div>
                    <hr />
                </div>
                <div className='pb-3'>
                    <div className='flex justify-between mb-2'>
                        <span className='text-sm font-medium'>Color: </span>
                        <ul className='text-xs flex gap-1 flex-wrap font-medium text-slate-600 *:w-5 *:h-5 *:bg-teal-400 *:rounded-full'>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <hr />
                </div>
                <div>
                    <div className='flex justify-between'>
                        <span className='text-sm font-medium'>Size: </span>
                        <ul className='text-xs flex gap-3 font-medium text-slate-600'>
                            <li>S</li>
                            <li>M</li>
                            <li>L</li>
                            <li>XL</li>
                            <li>XXL</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompareProductCard;
