'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { adminLogin } from '@/redux/features/auth/authSlice';
import { UserResType } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(adminLogin(formData));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='pb-10 bg-slate-200 min-h-screen'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Admin Login' }]} />
                <div className='flex justify-center items-center w-full mt-40'>
                    <div className='bg-white py-5 px-10 rounded-md shadow-md min-w-[500px] pb-10'>
                        <h2 className='text-center font-semibold text-slate-700 mb-5'>Admin Login</h2>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <Input
                                type='text'
                                name='identifier'
                                className='bg-gray-100 w-full py-5 focus:outline-gray-500'
                                placeholder='Email or Username'
                                autoComplete='off'
                                value={formData.identifier}
                                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                            />
                            <div className='relative'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    className='bg-gray-100 w-full py-5 focus:outline-gray-500'
                                    placeholder='Password'
                                    autoComplete='off'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                                <div
                                    className='absolute top-[10px] right-3 text-xl cursor-pointer text-gray-600'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                                </div>
                            </div>
                            <span>
                                <Link
                                    href={'/forgot-password'}
                                    className='hover:underline text-xs font-medium text-blue-800 ml-2'
                                >
                                    Forgot Password?
                                </Link>
                            </span>
                            <Button
                                type='submit'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AdminLogin;
