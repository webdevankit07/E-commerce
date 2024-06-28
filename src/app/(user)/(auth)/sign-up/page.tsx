/* eslint-disable react/no-unescaped-entities */
'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { SiTicktick } from 'react-icons/si';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <div className='pb-10 bg-slate-100 min-h-screen'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ location: 'sign-up', name: 'Sign-Up', lastElement: true }]} />
                <div className='flex justify-center items-center w-full mt-28'>
                    <div className='bg-white py-5 px-10 rounded-md drop-shadow-md min-w-[500px] pb-10'>
                        <h2 className='text-center font-semibold text-slate-700 mb-5'>Create an Account</h2>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <div className='space-y-8'>
                                <div className='relative'>
                                    <Input
                                        type='text'
                                        name='firstname'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='First name'
                                        autoComplete='off'
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='text'
                                        name='lastname'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Last name'
                                        autoComplete='off'
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='text'
                                        name='username'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Username'
                                        autoComplete='off'
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='email'
                                        name='email'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Email'
                                        autoComplete='off'
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                                </div>
                                <div className='relative'>
                                    <Input
                                        type='number'
                                        name='mobile'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Mobile'
                                        autoComplete='off'
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                                </div>

                                <div className='relative'>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Password'
                                        autoComplete='off'
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
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
                                        name='confirm password'
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Confirm Password'
                                        autoComplete='off'
                                    />
                                    <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
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
                                Create account
                            </Button>
                            <Button
                                type='button'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
                                onClick={() => router.push('/sign-in')}
                            >
                                Login with an account
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SignUp;
