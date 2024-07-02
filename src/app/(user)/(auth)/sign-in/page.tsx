/* eslint-disable react/no-unescaped-entities */
'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleAxiosError } from '@/config/axios';
import { useAppDispatch } from '@/hooks/storeHooks';
import { userLogin } from '@/redux/features/auth/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const SignIn = () => {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(userLogin(formData));
            toast.success('Login successful');
            router.push('/');
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
        }
    };

    return (
        <div className='pb-10 bg-slate-100 min-h-screen'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Login' }]} />
                <div className='flex justify-center items-center w-full mt-40'>
                    <div className='bg-white py-5 px-10 rounded-md drop-shadow-md min-w-[500px] pb-10'>
                        <h2 className='text-center font-semibold text-slate-700 mb-5'>Login</h2>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <Input
                                type='text'
                                name='identifier'
                                className='bg-gray-100 w-full py-5'
                                placeholder='Email or Username'
                                autoComplete='off'
                                value={formData.identifier}
                                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                            />
                            <div className='relative'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    className='bg-gray-100 w-full py-5'
                                    placeholder='Password'
                                    autoComplete='off'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                                <div
                                    className='absolute top-[9px] right-3 text-xl cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                                </div>
                            </div>
                            <div className='flex items-center justify-between p-2 text-xs font-medium'>
                                <div>
                                    <span>You Don't have an account?</span>
                                    <Link href={'/sign-up'} className='hover:underline text-blue-800 ml-1'>
                                        Sign Up
                                    </Link>
                                </div>
                                <Link href={'/forgot-password'} className='hover:underline text-blue-800 ml-2'>
                                    Forgot Password?
                                </Link>
                            </div>
                            <Button
                                type='submit'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
                            >
                                Login
                            </Button>
                            <Button
                                type='button'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
                                onClick={() => router.push('/sign-up')}
                            >
                                Create a new account
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SignIn;
