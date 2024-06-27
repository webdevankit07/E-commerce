import Image from 'next/image';
import Link from 'next/link';
import { FaCartArrowDown } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { IoEyeSharp } from 'react-icons/io5';
import ReactStars from 'react-stars';

const WishlistProduct = () => {
    const handleRating = () => {};

    return (
        <div className={`drop-shadow rounded-md p-4 bg-white max-w-[250px]`}>
            <div className={`group  justify-center items-center relative  overflow-hidden`}>
                <Link href={'/'}>
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
                <div className={`group/heart text-right absolute right-1.5 top-0 text-lg`}>
                    <Link href={'/'} className='group-hover/heart:hidden'>
                        <GoHeart />
                    </Link>
                    <Link href={'/'} className='hidden group-hover/heart:block text-red-500'>
                        <GoHeartFill />
                    </Link>
                </div>
                <div
                    className={`absolute flex flex-col gap-1 top-6 text-slate-800 group-hover:right-1 -right-10 transition-all duration-400 *:drop-shadow-md`}
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
            <div className='py-2 space-y-1'>
                <h6 className='text-[#bf4800] text-[13px] font-medium'>Headphone</h6>
                <p className='line-clamp-2 text-sm font-medium text-slate-900'>
                    Kids Headphones bulk 10 pack multi colored for students
                </p>
                <ReactStars count={5} value={4.5} onChange={handleRating} size={20} color2={'#ffd700'} edit={false} />
                <p className='text-sm font-semibold text-slate-900'>₹1200</p>
            </div>
        </div>
    );
};

export default WishlistProduct;
