'use client';
import Image from 'next/image';
import Link from 'next/link';
import ReactStars from 'react-stars';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/types';
import { formateBeforeDiscountPrice, formatePrice } from '@/lib/utils';

const SpecialProduct = ({ product }: { product: ProductType }) => {
    const router = useRouter();
    const [imgUrl, setImgUrl] = useState<string>('');

    useEffect(() => {
        setImgUrl(product.images[0].url);
    }, [product]);

    const progress = `${(product.quantity / 1000) * 100}%`;

    return (
        <div>
            <div className='drop-shadow rounded-md p-4   bg-white'>
                <div className='flex items-center gap-5'>
                    <div className='flex flex-col justify-between'>
                        <div className='w-[150px] h-[170px]'>
                            <Link href={`/products/${product._id}`}>
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
                                onClick={() => setImgUrl(product.images[0].url)}
                            >
                                <Image
                                    src={product.images[0].url}
                                    width={50}
                                    height={100}
                                    style={{ objectFit: 'contain' }}
                                    alt='product-image'
                                />
                            </div>
                            <div
                                className='flex justify-center items-center cursor-pointer'
                                onClick={() => setImgUrl(product.images[1].url)}
                            >
                                <Image
                                    src={product.images[1].url}
                                    width={50}
                                    height={100}
                                    style={{ objectFit: 'contain' }}
                                    alt='product-image'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <h6 className='text-[#bf4800] text-[13px] font-medium'>{product.category}</h6>
                        <p
                            className='line-clamp-2 font-semibold text-sm text-slate-900 cursor-pointer'
                            onClick={() => router.push('/products/asdbahsbdj')}
                        >
                            {product.title}
                        </p>
                        <ReactStars
                            count={5}
                            value={product.totalRating}
                            onChange={() => {}}
                            size={20}
                            color2={'#ffd700'}
                            edit={false}
                        />
                        <p className='text-sm font-medium space-x-3'>
                            <span className='text-red-700'>{formatePrice(product.price)}</span>
                            <del className='text-slate-700'>{formateBeforeDiscountPrice(product.price)}</del>
                        </p>
                        <p className='font-medium text-sm pt-2'>Products: {product.quantity}</p>
                        <Progress value={1000} style={{ width: progress }} />
                        <Button className='mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-slate-700'>
                            Add to Cart
                        </Button>
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
