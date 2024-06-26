'use client';
import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { FormEvent } from 'react';
import { FaHome } from 'react-icons/fa';
import { TbMapPinCode } from 'react-icons/tb';
import { PiPhoneCallFill } from 'react-icons/pi';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';

const Contact = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className='bg-slate-100 py-10'>
            <Container>
                <div className='py-5 h-[500px]'>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121058.93187219083!2d73.78056657797033!3d18.524761373588973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1719426661677!5m2!1sen!2sin'
                        width='100%'
                        height='100%'
                        loading='lazy'
                        className='border-0 rounded-md'
                    ></iframe>
                </div>
                <div className='bg-white py-5 px-10 rounded-md flex gap-10'>
                    <form className='w-full' onSubmit={handleSubmit}>
                        <h2 className='font-semibold text-lg mb-4'>Contact Us</h2>
                        <input
                            type='text'
                            className='bg-gray-100 text-sm focus:outline-none rounded-md p-3 w-full mb-4'
                            placeholder='Name'
                        />
                        <input
                            type='email'
                            className='bg-gray-100 text-sm focus:outline-none rounded-md p-3 w-full mb-4'
                            placeholder='Email'
                        />
                        <input
                            type='tel'
                            className='bg-gray-100 text-sm focus:outline-none rounded-md p-3 w-full mb-4'
                            placeholder='Mobile No.'
                        />
                        <textarea
                            className='bg-gray-100 text-sm focus:outline-none rounded-md p-3 w-full mb-3 resize-none'
                            placeholder='Comments'
                        />
                        <Button
                            variant={'outline'}
                            className='rounded-lg border-2 hover:bg-black hover:text-white border-slate-800'
                        >
                            Submit
                        </Button>
                    </form>
                    <div className='w-full'>
                        <h2 className='font-semibold text-lg mb-4'>Get in Touch with Us</h2>
                        <address className='flex flex-col gap-3'>
                            <p className='flex gap-4 items-center text-slate-600'>
                                <FaHome className='text-xl' />
                                <span className='text-sm'>House no : 244, Near Gopal Maidan, Yavat, Pune</span>
                            </p>
                            <p className='flex gap-4 items-center text-slate-600'>
                                <TbMapPinCode className='text-xl' />
                                <span className='text-sm'>412214</span>
                            </p>
                            <p className='flex gap-4 items-center text-slate-600'>
                                <PiPhoneCallFill className='text-xl' />
                                <Link href={'tel:+919304661037'} className='text-sm hover:underline'>
                                    +91 9304661037
                                </Link>
                            </p>
                            <p className='flex gap-4 items-center text-slate-600'>
                                <MdEmail className='text-xl' />
                                <Link href={'mailto:ankityadav.webdev@gmail.com'} className='text-sm hover:underline'>
                                    ankityadav.webdev@gmail.com
                                </Link>
                            </p>
                        </address>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Contact;
