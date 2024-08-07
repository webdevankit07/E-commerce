'use client';
import Actions from '@/components/Admin/Acion';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import ShowDate from '@/components/shared/ShowDate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { createCoupon, deleteCoupon, getAllCoupons } from '@/redux/features/coupon/couponSlice';
import { CouponType, CreateCouponDataType } from '@/types';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

const Coupon = () => {
    const { coupons, isLoading, createLoading } = useAppSelector((state) => state.coupon);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
    } = useForm<CouponType>();

    useEffect(() => {
        if (!coupons.length) {
            dispatch(getAllCoupons());
        }
    }, [dispatch, coupons]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Discount', dataIndex: 'discount', sorter: (a: any, b: any) => a.discount.localeCompare(b.discount) },
        { title: 'Expiry', dataIndex: 'expiry', sorter: (a: any, b: any) => a.expiry - b.expiry },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const handleDeleteCoupon = async (couponId: string) => {
        await dispatch(deleteCoupon(couponId));
    };

    const dataSource = coupons.map((coupon, index) => ({
        key: ++index,
        name: coupon.name,
        discount: `${coupon.discount}%`,
        expiry: <ShowDate timestamp={coupon.expiry} />,
        actions: (
            <Actions
                Id={coupon._id}
                handleDelete={handleDeleteCoupon}
                editBaseUrl={`coupon/update-coupon/${coupon._id}`}
                dialougeDescription='This action cannot be undone. This will permanently delete this Coupon.'
            />
        ),
    }));

    const handleCreateCoupon: SubmitHandler<CreateCouponDataType> = async (couponData) => {
        await dispatch(createCoupon(couponData));
    };

    return (
        <div className='pb-10'>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Coupons' }]} />
            <form className='bg-white px-10 py-10 rounded-md space-y-8'>
                <h2 className='text-xl font-medium'>Create Coupon</h2>
                <div className='relative border'>
                    <Input
                        type='text'
                        className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600 uppercase'
                        placeholder='Coupon name'
                        autoComplete='off'
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
                        {...register('expiry', {
                            required: { value: true, message: 'coupon expiry is required' },
                        })}
                        max={100}
                    />
                    <span className='absolute font-semibold text-xs ml-1 text-red-500'>{errors.expiry?.message}</span>
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
                    <span className='absolute font-semibold text-xs ml-1 text-red-500'>{errors.discount?.message}</span>
                </div>
                <Button
                    className='py-5 bg-green-600 rounded-sm hover:bg-green-700 min-w-[100px]'
                    onClick={handleSubmit(handleCreateCoupon)}
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
                        'Add Coupon'
                    )}
                </Button>
            </form>
            {isLoading ? <Loading /> : <Table title='Coupons' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

export default Coupon;
