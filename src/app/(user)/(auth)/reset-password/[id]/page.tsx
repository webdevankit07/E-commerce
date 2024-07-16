/* eslint-disable react/no-unescaped-entities */
'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleAxiosError } from '@/config/axios';
import { resetPassword } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Oval } from 'react-loader-spinner';

const ResetPassword = ({ params }: { params: { id: string } }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const { id: token } = params;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error('Password does not match');
        }

        setIsLoading(true);
        try {
            await resetPassword(token, password);
            setIsLoading(false);
            router.push('/sign-in');
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className='pb-10 bg-slate-100 min-h-screen'>
            <Container>
                <BreadCrumb BreadCrumbs={[{ name: 'Reset Password' }]} />
                <div className='flex justify-center items-center w-full mt-40'>
                    <div className='bg-white py-5 px-7 md:px-10 rounded-md drop-shadow-md pb-10 max-w-[500px] w-full'>
                        <h2 className='text-center font-medium text-slate-600 mb-5'>Reset Password</h2>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <div className='relative'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    className='bg-gray-100 w-full py-5'
                                    placeholder='New Password'
                                    autoComplete='off'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                            </div>
                            <Button
                                type='submit'
                                className='bg-yellow-1 text-slate-800 hover:bg-yellow-500 active:bg-yellow-1 mt-5'
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
                                    'Change Password'
                                )}
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
