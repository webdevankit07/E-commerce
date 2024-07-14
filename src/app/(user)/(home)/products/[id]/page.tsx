'use client';
import Container from '@/components/shared/Container';
import BreadCrumb from '@/components/shared/Breadcrumb';
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
import { formateBeforeDiscountPrice, formatePrice } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { toggleCompare } from '@/redux/features/auth/authSlice';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { Oval } from 'react-loader-spinner';

const Productdetails = ({ params }: { params: { id: string } }) => {
    const { user, isLoading, isError } = useAppSelector((state) => state.auth);
    const { isLoading: isCartLoading, isError: isCartError } = useAppSelector((state) => state.cart);
    const [inCompare, setInCompare] = useState(false);
    const [product, setProduct] = useState<ProductType>();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const product = await getProduct(params.id);
                setProduct(product);
                setSelectedColor(product.colors[0]);
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

    const handleAddtoCart = async () => {
        if (product) {
            await dispatch(addToCart({ productId: product?._id, cartData: { count: quantity, color: selectedColor } }));
            if (!isCartLoading && !isCartError) {
                router.push('/cart');
            }
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
                            <p className='font-semibold text-sm'>{product.title}</p>
                            <div className='flex items-center gap-3 font-semibold text-gray-500'>
                                <ReactStars
                                    count={5}
                                    value={product.totalRating}
                                    size={25}
                                    color2={'#ffd700'}
                                    edit={false}
                                />
                                <span className='text-sm'>({product.ratings.length} review)</span>
                            </div>
                        </div>
                        <div className='gap-3 font-semibold text-gray-700'>
                            <span className='font-bold text-sm'>Description: </span>
                            <div className='font-normal text-sm text-justify mt-1'>{product.description}</div>
                        </div>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-3 font-semibold text-gray-500'>
                                <span className='text-gray-700 font-bold text-sm'>Price: </span>
                                <span className='text-sm text-red-700'>{formatePrice(product.price)}</span>
                                <span className='text-sm line-through'>
                                    {formateBeforeDiscountPrice(product.price)}
                                </span>
                            </div>
                            <div className='text-gray-500'>
                                <span className='text-gray-700 font-bold text-sm mr-2'>Categories: </span>
                                <span className='space-x-2 *:capitalize'>
                                    <Badge variant={'secondary'}>{product.category}</Badge>
                                </span>
                            </div>
                            <div className='flex items-center gap-3 font-semibold text-gray-500'>
                                <span className='text-gray-700 font-bold text-sm'>Brand: </span>
                                <Badge variant={'secondary'}>{product.brand}</Badge>
                            </div>
                            <div className='flex items-center gap-3 font-semibold text-gray-600'>
                                <span className='text-gray-700 font-semibold'>Availablity: </span>
                                <span className='text-sm'>{product.quantity} in stock</span>
                            </div>
                        </div>
                        <div className='font-semibold space-y-1 text-gray-500'>
                            <span className='text-gray-700 font-bold text-sm'>Color: </span>
                            <ul className='text-sm flex items-center gap-2 *:bg-red-500'>
                                {product.colors.map((color) => (
                                    <li
                                        style={{ backgroundColor: color }}
                                        className={`border-[3px] cursor-pointer rounded-full *:transition-all *:duration-200 *:ease-in-out ${
                                            selectedColor === color && 'border-red-500'
                                        }`}
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        <div className='border-2 h-7 w-7 rounded-full border-gray-500'></div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <SetQuantity quantity={quantity} setQuantity={setQuantity} />
                        <div className='flex gap-3 *:w-[180px] *:text-xs'>
                            <Button variant={'outline'} className='w-40 bg-yellow-300 hover:bg-yellow-400'>
                                <RiShoppingBag3Fill className='mr-2 text-gray-900' />
                                Buy Now
                            </Button>
                            <Button
                                variant={'outline'}
                                className='w-40 bg-yellow-300 hover:bg-yellow-400'
                                onClick={handleAddtoCart}
                            >
                                {isCartLoading ? (
                                    <Oval
                                        visible={true}
                                        width={20}
                                        color='#ffffff'
                                        secondaryColor='#000000'
                                        ariaLabel='oval-loading'
                                        strokeWidth={3}
                                    />
                                ) : (
                                    <>
                                        <FaCartArrowDown className='mr-2 text-gray-900' />
                                        Add to Cart
                                    </>
                                )}
                            </Button>
                            <Button
                                variant={'outline'}
                                className='w-50 bg-yellow-300 hover:bg-yellow-400'
                                onClick={handleCompareToggle}
                            >
                                {isLoading ? (
                                    <Oval
                                        visible={true}
                                        width={20}
                                        color='#ffffff'
                                        secondaryColor='#000000'
                                        ariaLabel='oval-loading'
                                        strokeWidth={3}
                                    />
                                ) : (
                                    <>
                                        <FaCodeCompare className={`mr-2 text-gray-900`} />
                                        {inCompare ? 'Remove Compare' : 'Add to Compare'}
                                    </>
                                )}
                            </Button>
                            <Button
                                variant={'outline'}
                                className='w-40 bg-yellow-300 hover:bg-yellow-400'
                                onClick={() => {
                                    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`);
                                    toast.success('Product url Copied');
                                }}
                            >
                                <PiShareNetworkFill className='mr-2 text-gray-900' />
                                Share Product
                            </Button>
                        </div>
                    </div>
                </div>
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
