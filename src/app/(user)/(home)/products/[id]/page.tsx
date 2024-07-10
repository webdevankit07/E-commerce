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
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProduct } from '@/services/products';
import { handleAxiosError } from '@/config/axios';
import toast from 'react-hot-toast';
import { ProductType } from '@/types';
import Loading from '@/components/shared/Loading';
import { formatePrice } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { toggleCompare } from '@/redux/features/auth/authSlice';

const Productdetails = ({ params }: { params: { id: string } }) => {
    const { user, isLoading, isError } = useAppSelector((state) => state.auth);
    const [inCompare, setInCompare] = useState(false);
    const [product, setProduct] = useState<ProductType>();
    const [quantity, setQuantity] = useState(1);
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const product = await getProduct(params.id);
                setProduct(product);
                const inCompare = user?.compare.filter((Product) => Product._id === product._id);
                if (inCompare?.length) {
                    setInCompare(true);
                }
            } catch (error) {
                const err = await handleAxiosError(error);
                toast.error(err);
            }
        })();
    }, [params.id, user?.compare]);

    const handleCompareToggle = async () => {
        if (product) {
            await dispatch(toggleCompare(product._id));
            if (!isLoading && !isError) {
                toast.success(inCompare ? 'Removed' : 'Added to compare');
                !inCompare && router.push('/compare-products');
                inCompare ? setInCompare(false) : setInCompare(true);
            }
        } else {
            toast.error('Product not fetched');
        }
    };

    return !product ? (
        <Loading />
    ) : (
        <div className='bg-slate-100 min-h-screen'>
            <Container className='mb-5'>
                <BreadCrumb BreadCrumbs={[{ location: '/products', name: 'Products' }, { name: params.id }]} />
                <div className='flex bg-white p-5 mb-10 mt-5 rounded-md'>
                    <ImageSection images={product?.images} />
                    <div className='w-full space-y-5 py-5'>
                        <div>
                            <p className='font-bold'>{product.title}</p>
                            <div className='flex items-center gap-3 font-semibold text-gray-500'>
                                <ReactStars
                                    count={5}
                                    value={product.totalRating}
                                    size={20}
                                    color2={'#ffd700'}
                                    edit={false}
                                />
                                <span className='text-sm'>({product.ratings.length} review)</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 font-semibold text-gray-500'>
                            <span className='text-gray-700 font-bold'>Price: </span>
                            <span className='text-sm'>{formatePrice(product.price)}</span>
                        </div>
                        <div className='text-gray-500'>
                            <span className='text-gray-700 font-bold'>Categories: </span>
                            <span className='space-x-2 *:capitalize'>
                                <Badge variant={'secondary'}>{product.category}</Badge>
                            </span>
                        </div>
                        <div className='flex items-center gap-3 font-semibold text-gray-500'>
                            <span className='text-gray-700 font-bold'>Brand: </span>
                            <span className='text-sm'>{product.brand}</span>
                        </div>
                        <div className='flex items-center gap-3 font-semibold text-gray-500'>
                            <span className='text-gray-700 font-bold'>Availablity: </span>
                            <span className='text-sm'>{product.quantity} in stock</span>
                        </div>
                        <div className='font-semibold space-y-1 text-gray-500'>
                            <span className='text-gray-700 font-bold'>Color: </span>
                            <ul className='text-sm flex items-center gap-2 *:bg-red-500 *:h-[20px] *:w-[20px] *:rounded-full'>
                                {product.colors.map((color) => (
                                    <>
                                        <li style={{ backgroundColor: color }} className='border-gray-500'></li>
                                    </>
                                ))}
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
                            <Button
                                variant={'outline'}
                                className='w-50 bg-yellow-300 hover:bg-yellow-400'
                                onClick={handleCompareToggle}
                            >
                                <FaCodeCompare className='mr-2 text-gray-900 text-lg' />
                                {inCompare ? 'Remove from Compare' : 'Add to Compare'}
                            </Button>
                            <Button
                                variant={'outline'}
                                className='w-40 bg-yellow-300 hover:bg-yellow-400'
                                onClick={() => {
                                    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`);
                                    toast.success('Product url Copied');
                                }}
                            >
                                <PiShareNetworkFill className='mr-2 text-gray-900 text-lg' />
                                Share Product
                            </Button>
                        </div>
                    </div>
                </div>
                <DescriprionSection description={product.description} />
                <ReviewsSection
                    productId={product._id}
                    totalRating={product.totalRating}
                    ratings={product.ratings}
                    setProduct={setProduct}
                />
            </Container>
            <PopularProducts />
        </div>
    );
};

export default Productdetails;
