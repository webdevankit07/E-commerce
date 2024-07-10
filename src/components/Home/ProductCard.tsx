'use client';
import Image from 'next/image';
import Link from 'next/link';
import ReactStars from 'react-stars';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { IoEyeSharp } from 'react-icons/io5';
import { FaShuffle } from 'react-icons/fa6';
import { FaCartArrowDown } from 'react-icons/fa6';
import { ProductType } from '@/types';
import { formatePrice } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { toggleCompare, toggleWishList } from '@/redux/features/auth/authSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProductCardprops {
    grid?: number;
    product: ProductType;
}

const ProductCard = ({ grid, product }: ProductCardprops) => {
    const { title, description, category, images, price, totalRating } = product;
    const { user, isLoading, isError } = useAppSelector((state) => state.auth);
    const [inWishList, setInWishlist] = useState(false);
    const [inCompare, setInCompare] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleRating = (newRating: number) => {
        console.log(newRating);
    };

    useEffect(() => {
        const inWishlist = user?.wishlist.filter((Product) => Product._id === product._id);
        if (inWishlist?.length) {
            setInWishlist(true);
        }
        const inCompare = user?.compare.filter((Product) => Product._id === product._id);
        if (inCompare?.length) {
            setInCompare(true);
        }
    }, [user?.wishlist, product._id, user?.compare]);

    const handleWishlistToggle = async () => {
        await dispatch(toggleWishList(product._id));
        if (!isLoading && !isError) {
            toast.success(!inWishList ? 'Added to wishlist' : 'Removed');
            router.push('/wishlist');
            setInWishlist(true);
        }
    };

    const handleCompareToggle = async () => {
        await dispatch(toggleCompare(product._id));
        if (!isLoading && !isError) {
            toast.success('Added to compare');
            router.push('/compare-products');
            setInCompare(true);
        }
    };

    return (
        <div className={`drop-shadow rounded-md p-3 bg-white ${grid === 1 && 'flex gap-10'}`}>
            <div
                className={`group  justify-center items-center relative mb-2 rounded  overflow-hidden ${
                    grid === 1 && 'min-w-[250px] min-h-[250px] max-h-[250px]'
                }`}
            >
                <Link href={`/products/${product._id}`}>
                    <div className={`min-h-[200px]`}>
                        <Image
                            src={images[0].url}
                            fill
                            sizes='100%'
                            alt='product-image'
                            className='group-hover:opacity-0 hover:scale-120 ease-in-out transition duration-500'
                        />
                        <Image
                            src={images[1].url}
                            fill
                            sizes='100%'
                            alt='product-image'
                            className='opacity-0 group-hover:opacity-100 hover:scale-110 ease-in-out transition duration-500'
                        />
                    </div>
                </Link>
                <div
                    className={`group/heart text-right absolute right-1.5 top-0 text-lg cursor-pointer ${
                        grid === 1 && 'right-2.5'
                    }`}
                    onClick={handleWishlistToggle}
                >
                    {inWishList ? (
                        <div className='text-red-500'>
                            <GoHeartFill />
                        </div>
                    ) : (
                        <div>
                            <div className='group-hover/heart:hidden'>
                                <GoHeart />
                            </div>
                            <div className='hidden group-hover/heart:block text-red-500'>
                                <GoHeartFill />
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className={`absolute flex flex-col gap-1 top-6 text-slate-800 group-hover:right-1 -right-10 transition-all duration-400 *:drop-shadow-md *:cursor-pointer ${
                        grid === 1 && 'group-hover:right-2'
                    }`}
                >
                    {!inCompare && (
                        <div onClick={handleCompareToggle}>
                            <FaShuffle className='text-2xl p-1 hover:bg-yellow-1 transition duration-200 rounded-full' />
                        </div>
                    )}
                    <Link href={`/products/${product._id}`}>
                        <IoEyeSharp className='text-2xl p-1 hover:bg-yellow-1 transition duration-200 rounded-full' />
                    </Link>
                    <div>
                        <FaCartArrowDown className='text-2xl p-1 hover:bg-yellow-1 transition duration-200 rounded-full' />
                    </div>
                </div>
            </div>
            <Link href={`/products/${product._id}`} className='py-2 space-y-1 text-start'>
                <h6 className='text-[#bf4800] text-[13px] font-medium'>{category}</h6>
                <div>
                    <p className='line-clamp-2 text-xs font-semibold text-slate-900 h-8'>{title}</p>
                    <ReactStars
                        count={5}
                        value={totalRating}
                        onChange={handleRating}
                        size={20}
                        color2={'#ffd700'}
                        edit={false}
                    />
                </div>
                {grid === 1 && <p className='text-wrap text-sm text-slate-700 py-1 line-clamp-5'>{description}</p>}
                {grid !== 1 && <p className='text-wrap text-xs text-slate-700 line-clamp-4'>{description}</p>}
                <p className='text-sm font-semibold text-slate-900 pt-3'>{formatePrice(price)}</p>
            </Link>
        </div>
    );
};

export default ProductCard;
