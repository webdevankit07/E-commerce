'use client';
import Image from 'next/image';
import Link from 'next/link';
import ReactStars from 'react-stars';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { IoEyeSharp } from 'react-icons/io5';
import { FaShuffle } from 'react-icons/fa6';
import { FaCartArrowDown } from 'react-icons/fa6';

interface ProductCardprops {
    grid?: number;
}

const ProductCard = ({ grid }: ProductCardprops) => {
    const handleRating = (newRating: number) => {
        console.log(newRating);
    };

    return (
        <div className={`drop-shadow rounded-md p-4 bg-white ${grid === 1 && 'flex gap-10'}`}>
            <div
                className={`group  justify-center items-center relative  overflow-hidden ${grid === 1 && 'w-[500px]'}`}
            >
                <Link href={`/products/${'asdbahsbdj'}`}>
                    <div className={`min-h-[200px] w-auto`}>
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
                <div
                    className={`group/heart text-right absolute right-1.5 top-0 text-lg ${
                        grid === 1 && 'right-[8.5px]'
                    }`}
                >
                    <Link href={'/'} className='group-hover/heart:hidden'>
                        <GoHeart />
                    </Link>
                    <Link href={'/'} className='hidden group-hover/heart:block text-red-500'>
                        <GoHeartFill />
                    </Link>
                </div>
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
                <h6 className='text-[#bf4800] text-[13px] font-medium'>Headphone</h6>
                <p className='line-clamp-2 text-sm font-medium text-slate-900'>
                    Kids Headphones bulk 10 pack multi colored for students
                </p>
                <ReactStars count={5} value={4.5} onChange={handleRating} size={20} color2={'#ffd700'} edit={false} />
                {grid === 1 && (
                    <p className='text-wrap text-sm text-slate-400 py-1'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit vitae illum deleniti
                        repellendus commodi assumenda atque adipisci id, ipsum asperiores doloremque dolor ipsam
                        incidunt deserunt harum dolorum reiciendis, odio unde.
                    </p>
                )}
                <p className='text-sm font-semibold text-slate-900'>₹1200</p>
            </Link>
        </div>
    );
};

export default ProductCard;
