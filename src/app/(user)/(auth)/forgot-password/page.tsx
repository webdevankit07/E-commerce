/* eslint-disable react/no-unescaped-entities */
'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

const ForgotPassword = () => {
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className='pb-10 bg-slate-100 min-h-screen'>
            <Container>
                <BreadCrumb
                    BreadCrumbs={[{ location: 'forgot-password', name: 'Forgot Password', lastElement: true }]}
                />
                <div className='flex justify-center items-center w-full mt-40'>
                    <div className='bg-white py-5 px-10 rounded-md drop-shadow-md min-w-[500px] pb-10'>
                        <h2 className='text-center font-medium text-slate-600 mb-2'>Reset Your Password</h2>
                        <h3 className='text-center font-medium text-xs text-slate-500 mb-5'>
                            We will send you an email to reset your password
                        </h3>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <Input
                                type='email'
                                name='identifier'
                                className='bg-gray-100 w-full py-5'
                                placeholder='Enter your Email'
                                autoComplete='off'
                            />
                            <div className='flex items-center p-2 text-xs font-medium'>
                                <span>You Don't have an account?</span>
                                <Link href={'/sign-up'} className='hover:underline text-blue-800 ml-1'>
                                    Sign Up
                                </Link>
                            </div>
                            <Button
                                type='submit'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
                            >
                                Submit
                            </Button>
                            <Button
                                type='button'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1'
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ForgotPassword;
