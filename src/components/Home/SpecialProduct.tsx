'use client';
import Image from 'next/image';
import Link from 'next/link';
import ReactStars from 'react-stars';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { useState } from 'react';

const SpecialProduct = () => {
    const [imgUrl, setImgUrl] = useState<string>('/images/headphones.webp');

    return (
        <div>
            <div className='drop-shadow rounded-md p-4   bg-white'>
                <div className='flex items-center gap-5'>
                    <div className='flex flex-col gap-5'>
                        <div className='w-[150px] h-[170px]'>
                            <Link href={'/'}>
                                <Image
                                    src={imgUrl}
                                    width={250}
                                    height={200}
                                    style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                                    alt='product-image'
                                />
                            </Link>
                        </div>
                        <div className='flex *:flex-1 items-center justify-center'>
                            <div
                                className='flex justify-center items-center cursor-pointer'
                                onClick={() => setImgUrl('/images/headphones.webp')}
                            >
                                <Image
                                    src={'/images/headphones.webp'}
                                    width={50}
                                    height={100}
                                    style={{ objectFit: 'contain' }}
                                    alt='product-image'
                                />
                            </div>
                            <div
                                className='flex justify-center items-center cursor-pointer'
                                onClick={() => setImgUrl('/images/headphone.webp')}
                            >
                                <Image
                                    src={'/images/headphone.webp'}
                                    width={50}
                                    height={100}
                                    style={{ objectFit: 'contain' }}
                                    alt='product-image'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h6 className='text-[#bf4800] text-[13px] font-medium'>Headphone</h6>
                        <p className='line-clamp-2 font-semibold text-sm text-slate-900'>
                            Kids Headphones bulk 10 pack multi colored for students
                        </p>
                        <ReactStars
                            count={5}
                            value={4.5}
                            onChange={() => {}}
                            size={20}
                            color2={'#ffd700'}
                            edit={false}
                        />
                        <p className='text-sm font-medium space-x-3'>
                            <span className='text-red-700'>₹1200</span>
                            <del className='text-slate-700'>₹2400</del>
                        </p>
                        <div className='flex items-center gap-5'>
                            <p>
                                <b>5 Days</b>
                            </p>
                            <div className='flex items-center gap-2'>
                                <Badge value='1' />:
                                <Badge value='1' />:
                                <Badge value='1' />
                            </div>
                        </div>
                        <p className='font-medium text-sm pt-2'>Products: 100</p>
                        <Progress value={60} className='w-[75%]' />
                        <Button className='mt-3'>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Badge = ({ value }: { value: string }) => {
    return (
        <div className='w-7 h-7 bg-red-600 text-white text-sm rounded-full flex justify-center items-center'>
            {value}
        </div>
    );
};

export default SpecialProduct;
