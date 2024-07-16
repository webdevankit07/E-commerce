/* eslint-disable react/no-unescaped-entities */
'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleAxiosError } from '@/config/axios';
import { resetPassword, updatePassword } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Oval } from 'react-loader-spinner';

const UpdatePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            return toast.error('New passwords does not match');
        }

        setIsLoading(true);
        try {
            await updatePassword(oldPassword, newPassword);
            setIsLoading(false);
            toast.success('Password updated');
            router.back();
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen mt-2'>
            <BreadCrumb BreadCrumbs={[{ name: 'My Account' }, { name: 'Update Password' }]} />
            <div className='flex justify-center items-center w-full mt-40'>
                <div className='bg-white py-5 px-10 rounded-md drop-shadow-md max-w-[400px] sm:min-w-[500px] pb-10 w-full'>
                    <h2 className='text-center font-medium text-slate-600 mb-5'>Update Password</h2>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='relative'>
                            <Input
                                type={showOldPassword ? 'text' : 'password'}
                                name='oldPassword'
                                className='bg-gray-100 w-full py-5'
                                placeholder='Old Password'
                                autoComplete='off'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                            <div
                                className='absolute top-[9px] right-3 text-xl cursor-pointer'
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <IoMdEye /> : <IoMdEyeOff />}
                            </div>
                        </div>
                        <div className='relative'>
                            <Input
                                type={showNewPassword ? 'text' : 'password'}
                                name='newPassword'
                                className='bg-gray-100 w-full py-5'
                                placeholder='New Password'
                                autoComplete='off'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <span className='absolute text-xs mt-1 ml-1 text-red-500'></span>
                            <div
                                className='absolute top-[9px] right-3 text-xl cursor-pointer'
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <IoMdEye /> : <IoMdEyeOff />}
                            </div>
                        </div>
                        <div className='relative'>
                            <Input
                                type='password'
                                name='confirmNewPassword'
                                className='bg-gray-100 w-full py-5'
                                placeholder='Confirm New Password'
                                autoComplete='off'
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                                'Update Password'
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
        </div>
    );
};

export default UpdatePassword;
