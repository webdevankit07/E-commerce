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
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { Oval } from 'react-loader-spinner';

const SpecialProduct = ({ product }: { product: ProductType }) => {
    const { cart } = useAppSelector((state) => state.cart);
    const [inCart, setInCart] = useState(false);
    const [imgUrl, setImgUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const incart = cart?.products.filter((Product) => Product.product._id === product._id);
        if (incart?.length) {
            setInCart(true);
        }
    }, [cart, product]);

    useEffect(() => {
        setImgUrl(product.images[0].url);
    }, [product]);

    const progress = `${(product.quantity / 1000) * 100}%`;

    const handleAddtoCart = async () => {
        setIsLoading(true);
        if (!inCart) {
            await dispatch(addToCart({ productId: product._id, cartData: { count: 1, color: product.colors[0] } }));
        }
        router.push('/cart');
        setIsLoading(false);
    };

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
                        <Button
                            className='mt-3 w-full bg-red-700 hover:bg-red-800 text-slate-100'
                            onClick={handleAddtoCart}
                        >
                            {isLoading ? (
                                <Oval
                                    visible={true}
                                    width={20}
                                    color='#ffffff'
                                    secondaryColor='#000000'
                                    ariaLabel='oval-loading'
                                    strokeWidth={3}
                                    strokeWidthSecondary={3}
                                />
                            ) : (
                                'Add to Cart'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialProduct;
