'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { formatePrice } from '@/lib/utils';
import { toggleCompare } from '@/redux/features/auth/authSlice';
import { ProductType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { RxCross1 } from 'react-icons/rx';
import ReactStars from 'react-stars';

const CompareProductCard = ({ product }: { product: ProductType }) => {
    const { images, price, category, colors, title, brand, totalRating } = product;
    const { isLoading, isError } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleCompareToggle = async () => {
        await dispatch(toggleCompare(product._id));
        if (!isLoading && !isError) {
            toast.success('Removed from compare');
        }
    };

    return (
        <div className={`drop-shadow rounded-md p-4 bg-white overflow-hidden`}>
            <div className={`group justify-center items-center relative`}>
                <Link href={`/products/${product._id}`}>
                    {images && (
                        <div className={`max-[500px]:h-[300px] max-[640px]:h-[200px] sm:h-[200px] w-auto`}>
                            <Image
                                src={images[0].url}
                                fill
                                sizes='100%'
                                alt='product-image'
                                className='group-hover:opacity-0 transition duration-500'
                            />
                            <Image
                                src={images[0].url}
                                fill
                                sizes='100%'
                                alt='product-image'
                                className='opacity-0 group-hover:opacity-100 transition duration-500'
                            />
                        </div>
                    )}
                </Link>
                <div
                    className={`text-right absolute -right-1 top-0 text-lg cursor-pointer`}
                    onClick={handleCompareToggle}
                >
                    <RxCross1 className='text-2xl bg-slate-900 hover:bg-red-600 p-1 text-slate-50 rounded-full transition duration-100 hover:scale-125' />
                </div>
            </div>
            <div className='py-2 space-y-1'>
                <h6 className='text-[#bf4800] text-xs sm:text-[13px] font-medium'>Headphone</h6>
                <p className='text-xs font-medium text-slate-900 hover:underline cursor-pointer line-clamp-2 h-8'>
                    {title}
                </p>
                <ReactStars count={5} value={totalRating} size={20} color2={'#ffd700'} edit={false} />
                <p className='text-sm font-semibold text-slate-900 py-2'>{formatePrice(price)}</p>
                <div className='pb-3'>
                    <div className='flex justify-between mb-2 gap-2'>
                        <span className='text-xs sm:text-sm text-slate-950 font-medium'>Brand: </span>
                        <span className='text-xs font-medium text-slate-600'>{brand}</span>
                    </div>
                    <hr />
                </div>
                <div className='pb-3'>
                    <div className='flex justify-between mb-2 gap-2'>
                        <span className='text-xs sm:text-sm text-slate-950 font-medium'>Type: </span>
                        <span className='text-xs font-medium text-slate-600'>{category}</span>
                    </div>
                    <hr />
                </div>
                <div className='pb-3'>
                    <div className='flex justify-between mb-2 gap-2'>
                        <span className='text-xs sm:text-sm text-slate-950 font-medium'>Availablity: </span>
                        <span className='text-xs font-medium text-slate-600'>
                            {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                    <hr />
                </div>
                <div className='pb-3'>
                    <div className='flex justify-between mb-2 gap-2'>
                        <span className='text-xs sm:text-sm text-slate-950 font-medium'>Color: </span>
                        <ul className='flex gap-1 flex-wrap text-slate-600 *:rounded-full'>
                            {colors.map((color) => (
                                <li key={color} style={{ backgroundColor: color }} className='w-5 h-5'></li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default CompareProductCard;
