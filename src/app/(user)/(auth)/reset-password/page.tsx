/* eslint-disable react/no-unescaped-entities */
'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className='pb-10 bg-slate-100 min-h-screen'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Reset Password' }]} />
                <div className='flex justify-center items-center w-full mt-40'>
                    <div className='bg-white py-5 px-10 rounded-md drop-shadow-md min-w-[500px] pb-10'>
                        <h2 className='text-center font-medium text-slate-600 mb-5'>Reset Password</h2>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <div className='relative'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    className='bg-gray-100 w-full py-5'
                                    placeholder='New Password'
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
                            <Button
                                type='submit'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1 mt-5'
                            >
                                Change Password
                            </Button>
                            <Button
                                type='button'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
                                onClick={() => router.back()}
                            >
                                Go Back
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ResetPassword;
