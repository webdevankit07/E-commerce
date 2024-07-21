'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Axios, handleAxiosError } from '@/config/axios';
import { loadScript } from '@/config/loadScript';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { countries, IndianStates } from '@/lib/data';
import { formatePrice } from '@/lib/utils';
import { emptyCart, getMyCart } from '@/redux/features/cart/cartSlice';
import { createOrder } from '@/services/order';
import { ShippingInfoType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaChevronLeft } from 'react-icons/fa';

interface FormDataType {
    country: string;
    firstname: string;
    lastname: string;
    address: string;
    subAddress: string;
    city: string;
    state: string;
    pincode: string;
}

const CheckOut = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(getMyCart());
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataType>();

    const chechOutHandler = async (shippingInfo: ShippingInfoType) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
            return toast.error('Razorpay SDK failed to load');
        }

        if (user && cart && cart.products.length) {
            const Amount = cart && cart.totalAfterDiscount ? cart.totalAfterDiscount : cart?.cartTotal;
            const totalAmount = Amount + 100;

            const result = await Axios.post('/user/order/checkout', { amount: totalAmount });
            if (!result) {
                return toast.error('Something went wrong');
            }

            const { amount, id: order_id, currency } = result.data.order;

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
                amount: amount,
                currency: currency,
                name: `${user.firstname} ${user.lastname}`,
                description: 'Test Transaction',
                order_id: order_id,
                handler: async (response: any) => {
                    const verificationData = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    try {
                        const { data } = await Axios.post<{ razorpayOrderId: string; razorpayPaymentId: string }>(
                            '/user/order/payment-verification',
                            verificationData
                        );

                        const paymentInfo = {
                            razorpayOrderId: data.razorpayOrderId,
                            razorpayPaymentId: data.razorpayPaymentId,
                        };

                        const totalPriceAfterDiscount = cart.totalAfterDiscount ? cart.totalAfterDiscount : 0;
                        const orderDetails = {
                            shippingInfo,
                            paymentInfo,
                            orderItems: cart.products,
                            totalPrice: cart.cartTotal,
                            totalPriceAfterDiscount,
                        };
                        await createOrder(orderDetails)
                            .then(() => {
                                dispatch(emptyCart());
                                toast.success('Order created');
                                router.push('/products');
                            })
                            .catch(async (error) => {
                                const err = await handleAxiosError(error);
                                toast.error(err);
                            });
                    } catch (error) {
                        const err = await handleAxiosError(error);
                        toast.error(err);
                    }
                },
                prefill: {
                    name: `${user.firstname} ${user.lastname}`,
                    email: user.email,
                    contact: user.mobile,
                },
                notes: {
                    address: 'WebDev office',
                },
                theme: {
                    color: '#61dafb',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } else {
            toast.error('Cart products not available');
        }
    };

    const handleFormSubmit: SubmitHandler<FormDataType> = async (formData) => {
        const { firstname, lastname, address, city, state, pincode } = formData;
        chechOutHandler({ firstname, lastname, address, city, state, pincode });
    };

    return !cart || !user ? (
        <Loading />
    ) : (
        <div>
            <div className='flex max-lg:flex-col *:py-20 min-h-screen'>
                <div className='w-full border-r-2 px-10 border-slate-300'>
                    <div className='lg:ml-auto max-w-[700px]'>
                        <h1 className='text-2xl font-semibold'>ShopWave</h1>
                        <BreadCrumb BreadCrumbs={[{ name: 'Cart', location: '/cart' }, { name: 'Information' }]} />
                        <div className='mt-3'>
                            <div>
                                <h2 className='text-lg font-medium'>Contact Information</h2>
                                <p className='mt-2 text-sm'>{`${user?.firstname} ${user?.lastname} (${user?.email})`}</p>
                            </div>
                            <form onSubmit={handleSubmit(handleFormSubmit)} className='mt-8 flex flex-col gap-6'>
                                <h2 className='text-lg font-medium'>Shipping address</h2>
                                <div className='relative'>
                                    <label htmlFor='address' className='text-sm'>
                                        Country/Region
                                    </label>
                                    <select
                                        id='country'
                                        defaultValue={user.address.length ? user?.address[0].country : ''}
                                        className='w-full py-2 px-5 border-2 rounded border-gray-300 mt-1'
                                        {...register('country', {
                                            required: { value: true, message: 'country is required' },
                                        })}
                                    >
                                        <option value='none' className='bg-slate-100'>
                                            Select Country
                                        </option>
                                        {countries.map((country) => (
                                            <option value={country} key={country} className='bg-slate-100 p-10'>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                    <div className='absolute text-xs ml-1 text-red-500'>{errors.country?.message}</div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='relative w-full'>
                                        <Input
                                            placeholder='First name'
                                            defaultValue={user?.firstname}
                                            autoComplete='off'
                                            className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                            {...register('firstname', {
                                                required: { value: true, message: 'firstname is required' },
                                                minLength: {
                                                    value: 3,
                                                    message: 'firstname must be atleast 3 characters',
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message: 'firstname must be atmost 100 characters',
                                                },
                                            })}
                                        />
                                        <div className='absolute text-xs ml-1 text-red-500'>
                                            {errors.firstname?.message}
                                        </div>
                                    </div>
                                    <div className='relative w-full'>
                                        <Input
                                            placeholder='Last name (optional)'
                                            defaultValue={user?.lastname}
                                            className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                            autoComplete='off'
                                            {...register('lastname', {
                                                required: { value: true, message: 'lastname is required' },
                                                minLength: {
                                                    value: 3,
                                                    message: 'lastname must be atleast 3 characters',
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message: 'lastname must be atmost 100 characters',
                                                },
                                            })}
                                        />
                                        <div className='absolute text-xs ml-1 text-red-500'>
                                            {errors.lastname?.message}
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full relative'>
                                    <Input
                                        placeholder='Address'
                                        defaultValue={user.address.length ? user?.address[0].address : ''}
                                        className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                        autoComplete='off'
                                        {...register('address', {
                                            required: { value: true, message: 'address is required' },
                                            minLength: { value: 3, message: 'address must be atleast 3 characters' },
                                            maxLength: {
                                                value: 100,
                                                message: 'address must be atmost 100 characters',
                                            },
                                        })}
                                    />
                                    <div className='absolute text-xs ml-1 text-red-500'>{errors.address?.message}</div>
                                </div>
                                <div>
                                    <Input
                                        placeholder='Appartment, Flat no. (optional)'
                                        defaultValue={user.address.length ? user?.address[0].subAddress : ''}
                                        className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                        autoComplete='off'
                                        {...register('subAddress', {
                                            required: { value: false, message: 'subAddress is required' },
                                            minLength: { value: 3, message: 'subAddress must be atleast 3 characters' },
                                            maxLength: {
                                                value: 100,
                                                message: 'subAddress must be atmost 100 characters',
                                            },
                                        })}
                                    />
                                    <div className='absolute text-xs ml-1 text-red-500'>
                                        {errors.subAddress?.message}
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='w-full relative'>
                                        <Input
                                            placeholder='City'
                                            defaultValue={user.address.length ? user?.address[0].city : ''}
                                            className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                            autoComplete='off'
                                            {...register('city', {
                                                required: { value: true, message: 'city is required' },
                                            })}
                                        />
                                        <div className='absolute text-xs ml-1 text-red-500'>{errors.city?.message}</div>
                                    </div>
                                    <div className='w-full relative'>
                                        <select
                                            id='state'
                                            defaultValue={user.address.length ? user?.address[0].state : ''}
                                            className='w-full py-2 px-5 border-2 rounded border-gray-300'
                                            {...register('state', {
                                                required: { value: true, message: 'state is required' },
                                            })}
                                        >
                                            <option value='none'>Select State</option>
                                            {IndianStates.map((state) => (
                                                <option value={state} key={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>
                                        <div className='absolute text-xs ml-1 text-red-500'>
                                            {errors.state?.message}
                                        </div>
                                    </div>
                                    <div className='w-full relative'>
                                        <Input
                                            type='number'
                                            placeholder='Zip Code'
                                            defaultValue={user.address.length ? user?.address[0].postalCode : ''}
                                            className='px-3 py-5 border-2 border-gray-300 rounded outline-gray-500'
                                            autoComplete='off'
                                            {...register('pincode', {
                                                required: { value: true, message: 'pincode is required' },
                                            })}
                                        />
                                        <div className='absolute text-xs ml-1 text-red-500'>
                                            {errors.pincode?.message}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <Link
                                        href={'/cart'}
                                        className='flex items-center gap-2 cursor-pointer hover:underline'
                                    >
                                        <FaChevronLeft className='text-sm' />
                                        Return to cart
                                    </Link>
                                    <div className='space-x-5'>
                                        <Button className='rounded-md py-6 px-5 text-white bg-pink-800 hover:bg-pink-900'>
                                            Place order
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <hr className='mt-10 mb-2' />
                        <span className='text-sm px-2 text-slate-600'>All rights reserved &copy;ShopWave</span>
                    </div>
                </div>
                <div className='w-full  px-10 bg-slate-100'>
                    <div className='max-w-[600px]'>
                        <div>
                            {cart?.products.map((cartItem) => (
                                <div
                                    className='flex items-center justify-between gap-10 p-3 border-b'
                                    key={cartItem._id}
                                >
                                    <Link
                                        href={`/products/${cartItem.product._id}`}
                                        className='flex items-center gap-10 w-full'
                                    >
                                        <div className='relative'>
                                            <Image
                                                src={cartItem.product.images[0].url}
                                                width={60}
                                                height={60}
                                                alt='cartProduct-img'
                                            />
                                            <span className='absolute text-xs -top-1 -right-2 bg-black/[.6] h-5 w-5 grid place-content-center text-white rounded-full'>
                                                {cartItem.count}
                                            </span>
                                        </div>
                                        <div className='space-y-1'>
                                            <p className='font-medium text-xs max-w-96 mb-2'>
                                                {cartItem.product.title}
                                            </p>
                                            <div
                                                className='h-5 w-5 rounded-full border border-gray-800'
                                                style={{ backgroundColor: cartItem.color }}
                                            ></div>
                                        </div>
                                    </Link>
                                    <span className='font-medium text-sm'>{formatePrice(cartItem.product.price)}</span>
                                </div>
                            ))}
                        </div>
                        <div className='border-t-2 py-5 border-gray-300'>
                            <div className='flex items-center justify-between mb-3'>
                                <span className='text-sm font-medium text-gray-500'>Subtotal</span>
                                <span className='font-medium text-sm'>{formatePrice(cart.cartTotal)}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm font-medium text-gray-500'>Shipping charge</span>
                                <span className='font-medium text-sm'>{formatePrice(100)}</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between text-lg font-medium border-t-2 py-5 border-gray-300'>
                            <span>Total</span>
                            <span>{formatePrice(cart.cartTotal + 100)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
