'use client';
import Container from '@/components/shared/Container';
import BreadCrumb from '@/components/shared/Breadcrumb';
import DescriprionSection from '@/components/Our Store/Product/DescriprionSection';
import ReviewsSection from '@/components/Our Store/Product/ReviewsSection';
import PopularProducts from '@/components/Home/PopularProducts';
import ReactStars from 'react-stars';
import { Badge } from '@/components/ui/badge';
import ImageSection from '@/components/Our Store/Product/ImageSection';
import SetQuantity from '@/components/Our Store/Product/SetQuantity';
import { Button } from '@/components/ui/button';
import { FaCartArrowDown } from 'react-icons/fa';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { FaCodeCompare } from 'react-icons/fa6';
import { PiShareNetworkFill } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import { baseURL } from '@/config';
import { useState } from 'react';

const Productdetails = ({ params }: { params: { id: string } }) => {
    const [quantity, setQuantity] = useState(1);
    const pathname = usePathname();

    return (
        <div className='bg-slate-100 min-h-screen'>
            <Container className='mb-5'>
                <BreadCrumb
                    BreadCrumbs={[
                        { location: '/products', name: 'Products' },
                        { name: params.id, lastElement: true },
                    ]}
                />
                <div className='flex bg-white p-5 mb-10 mt-5 rounded-md'>
                    <ImageSection />
                    <div className='w-full space-y-5 py-5'>
                        <div>
                            <p className='font-bold'>Kids Headphones bulk 10 pack multi colored for students</p>
                            <div className='flex items-center gap-3 font-semibold text-gray-500'>
                                <ReactStars count={5} value={4.5} size={20} color2={'#ffd700'} edit={false} />
                                <span className='text-sm'>(2 review)</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 font-semibold text-gray-500'>
                            <span className='text-gray-700 font-bold'>Price: </span>
                            <span className='text-sm'>$100.00</span>
                        </div>
                        <div className='flex items-center gap-3 font-semibold text-gray-500'>
                            <span className='text-gray-700 font-bold'>Type: </span>
                            <span className='text-sm'>Headsets</span>
                        </div>
                        <div className='flex items-center gap-3 font-semibold text-gray-500'>
                            <span className='text-gray-700 font-bold'>Brand: </span>
                            <span className='text-sm'>Haviles</span>
                        </div>
                        <div className='text-gray-500'>
                            <span className='text-gray-700 font-bold'>Categories: </span>
                            <span className='space-x-2 *:capitalize'>
                                <Badge variant={'secondary'}>airpods</Badge>
                                <Badge variant={'secondary'}>cameras & laptop</Badge>
                                <Badge variant={'secondary'}>headphones</Badge>
                                <Badge variant={'secondary'}>mini speaker</Badge>
                                <Badge variant={'secondary'}>our store</Badge>
                                <Badge variant={'secondary'}>portable</Badge>
                                <Badge variant={'secondary'}>airpods</Badge>
                                <Badge variant={'secondary'}>cameras & laptop</Badge>
                                <Badge variant={'secondary'}>headphones</Badge>
                                <Badge variant={'secondary'}>mini speaker</Badge>
                                <Badge variant={'secondary'}>our store</Badge>
                                <Badge variant={'secondary'}>portable</Badge>
                            </span>
                        </div>
                        <div className='flex items-center gap-3 font-semibold text-gray-500'>
                            <span className='text-gray-700 font-bold'>Tags: </span>
                            <span className='space-x-2'>
                                <Badge variant={'secondary'}>Laptop</Badge>
                                <Badge variant={'secondary'}>MI</Badge>
                                <Badge variant={'secondary'}>Samsung</Badge>
                                <Badge variant={'secondary'}>Mobile</Badge>
                                <Badge variant={'secondary'}>Vivo</Badge>
                                <Badge variant={'secondary'}>SmartPhones</Badge>
                            </span>
                        </div>
                        <div className='flex items-center gap-3 font-semibold text-gray-500'>
                            <span className='text-gray-700 font-bold'>Availablity: </span>
                            <span className='text-sm'>541 in stock</span>
                        </div>
                        <div className='flex items-center gap-3 font-semibold text-gray-500'>
                            <span className='text-gray-700 font-bold'>Sizes: </span>
                            <div className='text-sm flex items-center gap-2 *:rounded *:py-1 *:px-2 *:border'>
                                <span>S</span>
                                <span>M</span>
                                <span className=' border-gray-800'>L</span>
                                <span>XL</span>
                                <span>XXL</span>
                            </div>
                        </div>
                        <div className='font-semibold space-y-1 text-gray-500'>
                            <span className='text-gray-700 font-bold'>Color: </span>
                            <ul className='text-sm flex items-center gap-2 *:bg-red-500 *:h-[20px] *:w-[20px] *:rounded-full'>
                                <li></li>
                                <li></li>
                                <li className='border-[2px] border-slate-100 outline outline-black outline-[1px]'></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                        <SetQuantity quantity={quantity} setQuantity={setQuantity} />
                        <div className='flex gap-3'>
                            <Button variant={'outline'} className='w-40 bg-yellow-300 hover:bg-yellow-400'>
                                <RiShoppingBag3Fill className='mr-2 text-gray-900 text-lg' />
                                Buy Now
                            </Button>
                            <Button variant={'outline'} className='w-40 bg-yellow-300 hover:bg-yellow-400'>
                                <FaCartArrowDown className='mr-2 text-gray-900 text-lg' />
                                Add to Cart
                            </Button>
                            <Button variant={'outline'} className='w-40 bg-yellow-300 hover:bg-yellow-400'>
                                <FaCodeCompare className='mr-2 text-gray-900 text-2xl' />
                                Add to Compare
                            </Button>
                            <Button
                                variant={'outline'}
                                className='w-40 bg-yellow-300 hover:bg-yellow-400'
                                onClick={() => {
                                    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`);
                                }}
                            >
                                <PiShareNetworkFill className='mr-2 text-gray-900 text-lg' />
                                Share Product
                            </Button>
                        </div>
                    </div>
                </div>
                <DescriprionSection />
                <ReviewsSection />
            </Container>
            <PopularProducts />
        </div>
    );
};

export default Productdetails;
