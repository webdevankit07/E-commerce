import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { formatePrice } from '@/lib/utils';
import { toggleWishList } from '@/redux/features/auth/authSlice';
import { ProductType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaCartArrowDown } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { GoHeartFill } from 'react-icons/go';
import { IoEyeSharp } from 'react-icons/io5';
import ReactStars from 'react-stars';

const WishlistProduct = ({ product }: { product: ProductType }) => {
    const { images, price, category, title, description, totalRating } = product;
    const { isLoading, isError } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleRating = async () => {};

    const handleWishlistToggle = async () => {
        await dispatch(toggleWishList(product._id));
        if (!isLoading && !isError) {
            toast.success('Removed from wishlist');
        }
    };

    return (
        <div className={`drop-shadow rounded-md p-2 bg-white h-[450px]`}>
            <div className={`group  justify-center items-center rounded-sm relative overflow-hidden`}>
                <Link href={`/products/${product._id}`}>
                    <div className={`min-h-[200px] w-auto`}>
                        <Image
                            src={images[0].url}
                            fill
                            sizes='100%'
                            alt='product-image'
                            className='group-hover:opacity-0 transition duration-500'
                        />
                        <Image
                            src={images[1].url}
                            fill
                            sizes='100%'
                            alt='product-image'
                            className='opacity-0 group-hover:opacity-100 transition duration-500'
                        />
                    </div>
                </Link>
                <div
                    className={`text-right absolute right-1.5 top-0 text-lg cursor-pointer`}
                    onClick={handleWishlistToggle}
                >
                    <div className='text-red-500'>
                        <GoHeartFill />
                    </div>
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
            <Link href={`/products/${product._id}`} className='pt-2 space-y-1 px-4'>
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
                <p className='text-wrap text-xs text-slate-700 line-clamp-4'>{description}</p>
                <p className='text-sm font-semibold text-slate-900 pt-3'>{formatePrice(price)}</p>
            </Link>
        </div>
    );
};

export default WishlistProduct;
