'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import React, { FormEvent } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

const CheckOut = () => {
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <div className='flex *:py-20 min-h-screen'>
                <div className='w-full border-r-2 px-10 border-slate-300'>
                    <div className='ml-auto max-w-[700px]'>
                        <h1 className='text-2xl font-semibold'>ShopWave</h1>
                        <BreadCrumb BreadCrumbs={[{ name: 'Cart', location: '/cart' }, { name: 'Information' }]} />
                        <div className='mt-3'>
                            <div>
                                <h2 className='text-lg font-medium'>Contact Information</h2>
                                <p className='mt-2 text-sm'>Ankit Yadav (ankityadav.webdev@gmail.com)</p>
                            </div>
                            <form onSubmit={submitHandler} className='mt-8 flex flex-col gap-4'>
                                <h2 className='text-lg font-medium'>Shipping address</h2>
                                <div>
                                    <label htmlFor='address' className='text-sm'>
                                        Country/Region
                                    </label>
                                    <select
                                        name='address'
                                        id='address'
                                        className='w-full py-2 px-5 border-2 rounded border-gray-300 mt-1'
                                    >
                                        <option value='none'>Select Country</option>
                                        <option value='india'>India</option>
                                        <option value='australia'>Australia</option>
                                        <option value='pakistan'>Pakistan</option>
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <Input
                                        name='firstname'
                                        placeholder='First name'
                                        autoComplete='off'
                                        className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                    />
                                    <Input
                                        name='lastname'
                                        placeholder='Last name (optional)'
                                        className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                        autoComplete='off'
                                    />
                                </div>
                                <Input
                                    name='address'
                                    placeholder='Address'
                                    className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                    autoComplete='off'
                                />
                                <Input
                                    name='appartment'
                                    placeholder='Appartment, Flat no. (optional)'
                                    className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                    autoComplete='off'
                                />
                                <div className='flex gap-2'>
                                    <Input
                                        name='city'
                                        placeholder='City'
                                        className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                        autoComplete='off'
                                    />
                                    <select
                                        name='address'
                                        id='address'
                                        className='w-full py-2 px-5 border-2 rounded border-gray-300'
                                    >
                                        <option value='none'>Select State</option>
                                        <option value='jarkhand'>Jharkhand</option>
                                        <option value='maharastra'>Maharashtra</option>
                                        <option value='bihar'>Bihar</option>
                                    </select>
                                    <Input
                                        name='zipcode'
                                        type='number'
                                        placeholder='Zip Code'
                                        className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className='flex justify-between items-center'>
                                    <Link
                                        href={'/cart'}
                                        className='flex items-center gap-2 cursor-pointer hover:underline'
                                    >
                                        <FaChevronLeft className='text-sm' />
                                        Return to cart
                                    </Link>
                                    <Link href={'/cart'}>
                                        <Button className='rounded-sm py-6 px-5 bg-red-600 hover:bg-red-700'>
                                            Continue Shipping
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <hr className='mt-10 mb-2' />
                        <span className='text-sm px-2 text-slate-600'>All rights reserved ShopWave</span>
                    </div>
                </div>
                <div className='w-full  px-10 bg-slate-100'>
                    <div className='max-w-[600px]'>
                        <div>
                            <div className='flex items-center justify-between gap-10 p-3'>
                                <Link href={'/products/asdbahsbdj'} className='flex items-center gap-5'>
                                    <div className='relative'>
                                        <Image
                                            src={'/images/headphones.webp'}
                                            width={60}
                                            height={60}
                                            alt='cartProduct-img'
                                        />
                                        <span className='absolute text-xs -top-1 -right-2 bg-black/[.6] h-5 w-5 grid place-content-center text-white rounded-full'>
                                            1
                                        </span>
                                    </div>
                                    <div className='space-y-1'>
                                        <p className='font-medium text-sm'>
                                            Kids Headphones bulk 10 pack multi colored for students
                                        </p>
                                        <div className='flex items-center gap-1 text-slate-400'>
                                            <span className='mr-2'>XL</span>/<span>#23254</span>
                                        </div>
                                    </div>
                                </Link>
                                <span className='font-medium text-sm'>$100.00</span>
                            </div>
                            <div className='flex items-center justify-between gap-10 p-3'>
                                <Link href={'/products/asdbahsbdj'} className='flex items-center gap-5'>
                                    <div className='relative'>
                                        <Image
                                            src={'/images/headphone.webp'}
                                            width={60}
                                            height={60}
                                            alt='cartProduct-img'
                                        />
                                        <span className='absolute -top-1 text-xs -right-2 bg-black/[.6] h-5 w-5 grid place-content-center text-white rounded-full'>
                                            1
                                        </span>
                                    </div>
                                    <div className='space-y-1'>
                                        <p className='font-medium text-sm'>
                                            Kids Headphones bulk 10 pack multi colored for students
                                        </p>
                                        <div className='flex items-center gap-1 text-slate-400'>
                                            <span className='mr-2'>XL</span>/<span>#23254</span>
                                        </div>
                                    </div>
                                </Link>
                                <span className='font-medium text-sm'>$100.00</span>
                            </div>
                            <div className='flex items-center justify-between gap-10 p-3'>
                                <Link href={'/products/asdbahsbdj'} className='flex items-center gap-5'>
                                    <div className='relative'>
                                        <Image
                                            src={'/images/headphones.webp'}
                                            width={60}
                                            height={60}
                                            alt='cartProduct-img'
                                        />
                                        <span className='absolute text-xs -top-1 -right-2 bg-black/[.6] h-5 w-5 grid place-content-center text-white rounded-full'>
                                            1
                                        </span>
                                    </div>
                                    <div className='space-y-1'>
                                        <p className='font-medium text-sm'>
                                            Kids Headphones bulk 10 pack multi colored for students
                                        </p>
                                        <div className='flex items-center gap-1 text-slate-400'>
                                            <span className='mr-2'>XL</span>/<span>#23254</span>
                                        </div>
                                    </div>
                                </Link>
                                <span className='font-medium text-sm'>$100.00</span>
                            </div>
                        </div>
                        <div className='border-t-2 py-5 border-gray-300'>
                            <div className='flex items-center justify-between mb-3'>
                                <span className='text-sm font-medium text-gray-500'>Subtotal</span>
                                <span className='font-medium text-sm'>$219.65</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm font-medium text-gray-500'>Shipping</span>
                                <span className='font-medium text-sm'>$219.65</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between text-lg font-medium border-t-2 py-5 border-gray-300'>
                            <span>Total</span>
                            <span>$219.65</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
