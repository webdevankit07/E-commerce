/* eslint-disable react/no-unescaped-entities */
'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

const SignIn = () => {
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className='pb-10 bg-slate-100 min-h-screen'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ location: 'sign-in', name: 'Login', lastElement: true }]} />
                <div className='flex justify-center items-center w-full mt-40'>
                    <div className='bg-white py-5 px-10 rounded-md drop-shadow-md min-w-[500px] pb-10'>
                        <h2 className='text-center font-semibold text-slate-700 mb-5'>Login</h2>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <Input
                                type='email'
                                name='identifier'
                                className='bg-gray-100 w-full py-5'
                                placeholder='Enter your Email or Username'
                                autoComplete='off'
                            />
                            <Input
                                type='text'
                                name='password'
                                className='bg-gray-100 w-full py-5'
                                placeholder='Enter your Password'
                                autoComplete='off'
                            />
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
