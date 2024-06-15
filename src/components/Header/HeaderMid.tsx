import Container from '../shared/Container';
import Link from 'next/link';
import { BsHeart, BsSearch } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';
import { FaRegUser } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';

const HeaderMid = () => {
    return (
        <div className='py-3'>
            <Container>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center justify-between gap-28'>
                        <h2>
                            <Link href={'/'}>ShopWave</Link>
                        </h2>
                        <div className='flex justify-center items-center rounded-sm overflow-hidden w-[500px]'>
                            <input
                                type='text'
                                className='py-2 px-3 w-full focus:outline-none text-black'
                                placeholder='Search Product Here...'
                            />
                            <span className='bg-yellow-1 text-black p-3'>
                                <BsSearch />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-10'>
                        <Link href={'/'} className='flex items-center gap-3'>
                            <TfiReload className='text-3xl' />
                            <p className='text-sm'>
                                Compare <br /> Products
                            </p>
                        </Link>
                        <Link href={'/'} className='flex items-center gap-3'>
                            <BsHeart className='text-3xl' />
                            <p className='text-sm'>
                                Favourite <br /> Wishlist
                            </p>
                        </Link>
                        <Link href={'/'} className='flex items-center gap-3'>
                            <FaRegUser className='text-3xl' />
                            <p className='text-sm'>
                                Log in <br /> My Account
                            </p>
                        </Link>
                        <Link href={'/'} className='flex items-center gap-3'>
                            <GiShoppingCart className='text-4xl text-yellow-1' />
                            <div className='text-sm space-y-1'>
                                <p className='bg-white px-3 text-black rounded-md text-center'>0</p>
                                <p className=''>$0.00</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeaderMid;
