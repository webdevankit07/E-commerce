'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleAxiosError } from '@/config/axios';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { updateCoupon } from '@/redux/features/coupon/couponSlice';
import { getCoupon } from '@/services/coupon';
import { CouponType, UpdateCouponDataType } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

const UpdateCoupon = ({ params }: { params: { id: string } }) => {
    const { createLoading } = useAppSelector((state) => state.coupon);
    const [coupon, setCoupon] = useState<CouponType>();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateCouponDataType>();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const coupon = await getCoupon(params.id);
                setCoupon(coupon);
                setIsLoading(false);
            } catch (error) {
                const err = await handleAxiosError(error);
                toast.error(err);
                setIsLoading(false);
            }
        })();
    }, [params.id]);

    const handleUpdateCoupon: SubmitHandler<UpdateCouponDataType> = async (couponData) => {
        try {
            await dispatch(updateCoupon({ couponData, couponId: params.id }));
            router.back();
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <div className='pb-10'>
            <BreadCrumb
                BreadCrumbs={[
                    { name: 'Dashboard', location: '/admin/dashboard' },
                    { name: 'Coupons', location: '/admin/dashboard/coupon' },
                    { name: 'Update Coupon' },
                ]}
            />
            {!coupon || isLoading ? (
                <Loading />
            ) : (
                <form className='bg-white px-10 py-10 rounded-md space-y-8'>
                    <h2 className='text-xl font-medium'>Update Coupon</h2>
                    <div className='relative border'>
                        <Input
                            type='text'
                            className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600 uppercase'
                            placeholder='Coupon name'
                            autoComplete='off'
                            defaultValue={coupon.name}
                            {...register('name', {
                                required: { value: true, message: 'coupon name is required' },
                            })}
                        />
                        <span className='absolute font-semibold text-xs ml-1 text-red-500'>{errors.name?.message}</span>
                    </div>
                    <div className='relative'>
                        <Input
                            type='datetime-local'
                            className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600'
                            placeholder='Expiry date'
                            autoComplete='off'
                            defaultValue={`${coupon.expiry}`}
                            {...register('expiry', {
                                required: { value: true, message: 'coupon expiry is required' },
                            })}
                            max={100}
                        />
                        <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                            {errors.expiry?.message}
                        </span>
                    </div>
                    <div className='relative'>
                        <Input
                            type='number'
                            className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600'
                            placeholder='Discount'
                            autoComplete='off'
                            {...register('discount', {
                                required: { value: true, message: 'coupon discount is required' },
                                validate: (value) => {
                                    return value <= 100 || 'max 100% discount is allowed';
                                },
                            })}
                        />
                        <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                            {errors.discount?.message}
                        </span>
                    </div>
                    <div className='space-x-3'>
                        <Button
                            className='py-5 bg-green-600 rounded-sm hover:bg-green-700 min-w-[100px]'
                            onClick={handleSubmit(handleUpdateCoupon)}
                        >
                            {createLoading ? (
                                <Oval
                                    visible={true}
                                    width={20}
                                    height={20}
                                    color='#ececec'
                                    secondaryColor='#c4c4c4'
                                    ariaLabel='oval-loading'
                                    strokeWidth={3}
                                />
                            ) : (
                                'Update Coupon'
                            )}
                        </Button>
                        <Button
                            className='py-5 bg-green-600 rounded-sm hover:bg-green-700 min-w-[100px]'
                            onClick={(e) => {
                                e.preventDefault();
                                router.push('/admin/dashboard/coupon');
                            }}
                        >
                            Create Coupon
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateCoupon;
