/* eslint-disable react/no-unescaped-entities */
'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleAxiosError } from '@/config/axios';
import { sendPasswordRestToken } from '@/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import rightTick from '../../../../../public/rightTick.png';
import Image from 'next/image';
import { Oval } from 'react-loader-spinner';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [tokenSend, setTokenSend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await sendPasswordRestToken(email);
            toast.success('Token sent to your email');
            setTokenSend(true);
            setIsLoading(false);
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className='pb-10 bg-slate-100 min-h-screen'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Forgot Password' }]} />
                <div className='flex justify-center items-center w-full mt-40'>
                    <div className='bg-white py-5 px-7 md:px-10 rounded-md drop-shadow-md min-h-[250px] max-w-[500px] w-full pb-10'>
                        {tokenSend ? (
                            <div className='flex flex-col items-center gap-3 justify-center h-[200px]'>
                                <div>
                                    <Image src={rightTick} width={100} height={100} alt='right' />
                                </div>
                                <div className='text-lg'>Check Your Email.</div>
                            </div>
                        ) : (
                            <div>
                                <h2 className='text-center font-medium text-slate-600 mb-2'>Reset Your Password</h2>
                                <h3 className='text-center font-medium text-xs text-slate-500 mb-5'>
                                    We will send you an email to reset your password
                                </h3>
                                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                                    <Input
                                        type='email'
                                        name='email'
                                        value={email}
                                        className='bg-gray-100 w-full py-5'
                                        placeholder='Enter your Email'
                                        autoComplete='off'
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        {isLoading ? (
                                            <Oval
                                                visible={true}
                                                width={20}
                                                color='#ffffff'
                                                secondaryColor='#000000'
                                                ariaLabel='oval-loading'
                                                strokeWidth={3}
                                                strokeWidthSecondary={3}
                                            />
                                        ) : (
                                            'Submit'
                                        )}
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
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ForgotPassword;
