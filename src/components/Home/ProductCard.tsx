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

interface ProductCardprops {
    grid?: number;
    product: ProductType;
}

const ProductCard = ({ grid, product }: ProductCardprops) => {
    const { title, description, brand, category, colors, images, price, quantity, totalRating } = product;
    const handleRating = (newRating: number) => {
        console.log(newRating);
    };

    return (
        <div className={`drop-shadow rounded-md p-3 bg-white ${grid === 1 && 'flex gap-10'}`}>
            <div
                className={`group  justify-center items-center relative mb-2 rounded  overflow-hidden ${
                    grid === 1 && 'min-w-[250px] min-h-[250px] max-h-[250px]'
                }`}
            >
                <Link href={`/products/${'asdbahsbdj'}`}>
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
                <Link
                    href='/wishlist'
                    className={`group/heart text-right absolute right-1.5 top-0 text-lg ${grid === 1 && 'right-2.5'}`}
                >
                    <div className='group-hover/heart:hidden'>
                        <GoHeart />
                    </div>
                    <div className='hidden group-hover/heart:block text-red-500'>
                        <GoHeartFill />
                    </div>
                </Link>
                <div
                    className={`absolute flex flex-col gap-1 top-6 text-slate-800 group-hover:right-1 -right-10 transition-all duration-400 *:drop-shadow-md ${
                        grid === 1 && 'group-hover:right-2'
                    }`}
                >
                    <Link href={'/'}>
                        <FaShuffle className='text-2xl p-1 hover:bg-yellow-1 transition duration-200 rounded-full' />
                    </Link>
                    <Link href={'/'}>
                        <IoEyeSharp className='text-2xl p-1 hover:bg-yellow-1 transition duration-200 rounded-full' />
                    </Link>
                    <Link href={'/'}>
                        <FaCartArrowDown className='text-2xl p-1 hover:bg-yellow-1 transition duration-200 rounded-full' />
                    </Link>
                </div>
            </div>
            <Link href={`/products/${'asdbahsbdj'}`} className='py-2 space-y-1'>
                <h6 className='text-[#bf4800] text-[13px] font-medium'>{category}</h6>
                <div>
                    <p className='line-clamp-2 text-xs font-semibold text-slate-900'>{title}</p>
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
                {grid === 5 && <p className='text-wrap text-xs text-slate-700 line-clamp-4'>{description}</p>}
                <p className='text-sm font-semibold text-slate-900 pt-3'>{formatePrice(price)}</p>
            </Link>
        </div>
    );
};

export default ProductCard;
