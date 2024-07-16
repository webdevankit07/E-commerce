'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import Image from 'next/image';
import { useState } from 'react';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';
import { MdDeleteSweep, MdEditOff, MdEmail, MdModeEdit } from 'react-icons/md';
import userImage from '../../../../../public/user.png';
import ProfileActions from '@/components/My Account/profile/ProfileActions';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { deleteUserAccount, updateUser, userLogout } from '@/redux/features/auth/authSlice';
import { Oval } from 'react-loader-spinner';
import Loading from '@/components/shared/Loading';
import { useRouter } from 'next/navigation';
import { RxUpdate } from 'react-icons/rx';

export interface UpdateUserData {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    mobile: string;
}

const Profile = () => {
    const { user, isLoading, isError } = useAppSelector((state) => state.auth);
    const [isEdit, setisEdit] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UpdateUserData>();

    const handleDeleteAccount = async () => {
        await dispatch(deleteUserAccount());
        if (!isLoading && !isError) {
            router.refresh();
        }
    };

    const handleSignOut = async () => {
        await dispatch(userLogout());
        if (!isLoading && !isError) {
            router.refresh();
        }
    };

    const handleFormSubmit: SubmitHandler<UpdateUserData> = async (FormData) => {
        await dispatch(updateUser(FormData));
        if (!isLoading && !isError) {
            setisEdit(false);
        }
    };

    return !user ? (
        <Loading />
    ) : (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'My Account' }, { name: 'Profile' }]} />
            <div className='max-w-[500px] mx-auto mt-20 '>
                <form className='flex flex-col'>
                    <div className='flex items-center justify-center'>
                        {user?.userPhotoURL ? (
                            <Image
                                src={user?.userPhotoURL}
                                height={100}
                                width={100}
                                alt='user-image'
                                className='border-2 rounded-full border-slate-200 outline outline-black shadow-lg'
                            />
                        ) : (
                            <Image
                                src={userImage}
                                height={100}
                                width={100}
                                alt='user-image'
                                className='border-2 rounded-full border-slate-200 outline outline-black shadow-lg'
                            />
                        )}
                    </div>
                    <div className='flex flex-col gap-7'>
                        <Button
                            type='button'
                            variant={'outline'}
                            size={'sm'}
                            className='flex items-center gap-1.5 bg-green-600/[.2] text-green-800 border-green-800  px-5 py-1 font-semibold ml-auto -mb-3'
                            onClick={() => setisEdit((prev) => !prev)}
                        >
                            {isEdit ? <MdEditOff /> : <MdModeEdit />}
                            <span className='ml-2'>Edit</span>
                        </Button>
                        <div className='relative'>
                            {!isEdit ? (
                                <>
                                    <Input
                                        type='text'
                                        id='name'
                                        placeholder='Enter your name'
                                        defaultValue={`${user?.firstname} ${user?.lastname}`}
                                        disabled
                                        autoComplete='off'
                                        className='px-10 py-5 border border-black text-slate-800'
                                    />
                                    <FaUserCircle size={20} className='absolute left-3 top-3' />
                                </>
                            ) : (
                                <div className='flex items-center gap-3'>
                                    <div className='relative w-full'>
                                        <Input
                                            type='text'
                                            placeholder='Enter your First Name'
                                            disabled={!isEdit}
                                            autoComplete='off'
                                            defaultValue={user?.firstname}
                                            className='py-5 border border-black text-slate-800'
                                            {...register('firstname', {
                                                required: { value: true, message: 'firstname is required' },
                                                minLength: {
                                                    value: 3,
                                                    message: 'firstname must be atleast 3 characters',
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message: 'firstname must be atmost 100 characters',
                                                },
                                                validate: (value) => {
                                                    return value !== 'admin' || 'unauthorized firstname';
                                                },
                                            })}
                                        />
                                        <span className='absolute text-xs mt-0.5 ml-1 text-red-500'>
                                            {errors.firstname?.message}
                                        </span>
                                    </div>
                                    <div className='relative w-full'>
                                        <Input
                                            type='text'
                                            placeholder='Enter your last name'
                                            disabled={!isEdit}
                                            autoComplete='off'
                                            defaultValue={user?.lastname}
                                            className=' py-5 border border-black text-slate-800'
                                            {...register('lastname', {
                                                required: { value: true, message: 'lastname is required' },
                                                min: { value: 3, message: 'lastname must be atleast 3 characters' },
                                                max: { value: 100, message: 'lastname must be atmost 100 characters' },
                                            })}
                                        />
                                        <span className='absolute text-xs mt-0.5 ml-1 text-red-500'>
                                            {errors.lastname?.message}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='relative'>
                            <Input
                                type='text'
                                placeholder='Enter your username'
                                disabled={!isEdit}
                                autoComplete='off'
                                defaultValue={user?.username}
                                className='px-10 py-5 border border-black text-slate-800'
                                {...register('username', {
                                    required: { value: true, message: 'username is required' },
                                    min: { value: 3, message: 'firstname must be atleast 3 characters' },
                                    max: { value: 100, message: 'firstname must be atmost 100 characters' },
                                })}
                            />
                            <FaUser size={18} className='absolute left-3 top-3' />
                            <span className='absolute text-xs mt-0.5 ml-1 text-red-500'>
                                {errors.username?.message}
                            </span>
                        </div>
                        <div className='relative'>
                            <Input
                                placeholder='Enter your email'
                                disabled={!isEdit}
                                autoComplete='off'
                                defaultValue={user?.email}
                                className='px-10 py-5 border border-black text-slate-800'
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
                            <MdEmail size={18} className='absolute left-3 top-3' />
                            <span className='absolute text-xs mt-0.5 ml-1 text-red-500'>{errors.email?.message}</span>
                        </div>
                        <div className='relative'>
                            <Input
                                type='number'
                                placeholder='Enter your mobile no.'
                                disabled={!isEdit}
                                autoComplete='off'
                                defaultValue={user?.mobile}
                                className='px-10 py-5 border border-black text-slate-800'
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
                            <IoIosCall size={18} className='absolute left-3 top-3' />
                            <span className='absolute text-xs mt-0.5 ml-1 text-red-500'>{errors.mobile?.message}</span>
                        </div>
                    </div>
                </form>
                <div>
                    {isEdit ? (
                        <Button
                            variant={'outline'}
                            size={'sm'}
                            className='flex items-center justify-center py-4 gap-1.5 bg-green-600/[.2] text-green-800 border-green-800  px-5 font-semibold w-full mt-6'
                            onClick={handleSubmit(handleFormSubmit)}
                        >
                            {isLoading ? (
                                <>
                                    <Oval
                                        visible={true}
                                        width={20}
                                        secondaryColor='#e3e3e3'
                                        color='#626262'
                                        ariaLabel='oval-loading'
                                        strokeWidth={3}
                                        strokeWidthSecondary={3}
                                    />
                                    <span className='ml-1'>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <RxUpdate />
                                    Update Details
                                </>
                            )}
                        </Button>
                    ) : (
                        <ProfileActions handleDeleteAccount={handleDeleteAccount} handleSignOut={handleSignOut} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
