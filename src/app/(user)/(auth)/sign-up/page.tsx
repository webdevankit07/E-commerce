/* eslint-disable react/no-unescaped-entities */
'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormData } from '@/types';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { userRegister } from '@/redux/features/auth/authSlice';
import { handleAxiosError } from '@/config/axios';
import { Oval } from 'react-loader-spinner';

const SignUp = () => {
    const { isLoading, isError } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm<SignUpFormData>();

    const handleFormSubmit: SubmitHandler<SignUpFormData> = async (formData) => {
        await dispatch(userRegister(formData));
        if (!isError) {
            router.refresh();
        }
    };

    return (
        <div className='pb-10 bg-slate-100 min-h-screen'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Sign-Up' }]} />
                <div className='flex justify-center items-center mt-16 md:mt-28'>
                    <div className='bg-white py-5 px-7 md:px-10 rounded-lg drop-shadow-md pb-10 max-w-[500px] w-full'>
                        <h2 className='text-center font-semibold text-slate-700 mb-5'>Create an Account</h2>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className='space-y-8'>
                                <div className='relative'>
                                    <Input
                                        type='text'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='First name'
                                        autoComplete='off'
                                        {...register('firstname', {
                                            required: { value: true, message: 'firstname is required' },
                                            minLength: { value: 3, message: 'firstname must be atleast 3 characters' },
                                            maxLength: {
                                                value: 100,
                                                message: 'firstname must be atmost 100 characters',
                                            },
                                            validate: (value) => {
                                                return value !== 'admin' || 'unauthorized firstname';
                                            },
                                        })}
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'>
                                        {errors.firstname?.message}
                                    </span>
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='text'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Last name'
                                        autoComplete='off'
                                        {...register('lastname', {
                                            required: { value: true, message: 'lastname is required' },
                                            min: { value: 3, message: 'lastname must be atleast 3 characters' },
                                            max: { value: 100, message: 'lastname must be atmost 100 characters' },
                                        })}
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'>
                                        {errors.lastname?.message}
                                    </span>
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='text'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Username'
                                        autoComplete='off'
                                        {...register('username', {
                                            required: { value: true, message: 'username is required' },
                                            min: { value: 3, message: 'firstname must be atleast 3 characters' },
                                            max: { value: 100, message: 'firstname must be atmost 100 characters' },
                                        })}
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'>
                                        {errors.username?.message}
                                    </span>
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='email'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Email'
                                        autoComplete='off'
                                        {...register('email', {
                                            required: { value: true, message: 'email required' },
                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                                message: 'Invalid Email Id',
                                            },
                                            validate: {
                                                blockDomain: (value) => {
                                                    return !value.endsWith('test.com') || 'This is not a valid domain';
                                                },
                                                lengthError: (value) => {
                                                    return value.length > 6 || 'please enter a valid email address';
                                                },
                                            },
                                        })}
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'>
                                        {errors.email?.message}
                                    </span>
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='number'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Mobile'
                                        autoComplete='off'
                                        {...register('mobile', {
                                            required: { value: true, message: 'mobile is required' },
                                            validate: {
                                                lengthError: (value) => {
                                                    if (value.length > 10) {
                                                        return 'Invalid mobile number';
                                                    } else if (value.length < 10) {
                                                        return 'Invalid mobile number';
                                                    }
                                                },
                                            },
                                        })}
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'>
                                        {errors.mobile?.message}
                                    </span>
                                </div>

                                <div className='relative'>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Password'
                                        autoComplete='off'
                                        {...register('password', {
                                            required: { value: true, message: 'password is required' },
                                            validate: {
                                                lengthError: (value) => {
                                                    return value.length >= 8 || 'password must be atleast 8 characters';
                                                },
                                            },
                                        })}
                                    />

                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'>
                                        {errors.password?.message}
                                    </span>
                                    <div
                                        className='absolute top-[9px] right-3 text-xl cursor-pointer'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                                    </div>
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='password'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Confirm Password'
                                        autoComplete='off'
                                        {...register('confirmPassword', {
                                            required: { value: true, message: 'Please confirm the password' },
                                            validate: (value) => {
                                                return watch('password') === value || 'your password does not match';
                                            },
                                        })}
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'>
                                        {errors.confirmPassword?.message}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between p-2 text-xs font-medium'>
                                <div>
                                    <span>You already have an account?</span>
                                    <Link href={'/sign-in'} className='hover:underline text-blue-700 ml-1'>
                                        Sign In
                                    </Link>
                                </div>
                            </div>

                            <Button
                                type='submit'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
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
                                    'Create account'
                                )}
                            </Button>
                            <Button
                                type='button'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
                                onClick={() => router.push('/sign-in')}
                            >
                                Login with an account
                            </Button>
                            <Button
                                type='button'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
                                onClick={() => router.push('/')}
                            >
                                Back To Home
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SignUp;
