import Container from '@/components/shared/Container';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { LuGift } from 'react-icons/lu';
import { ImHeadphones } from 'react-icons/im';
import { BiSolidOffer } from 'react-icons/bi';
import { FaRegCreditCard } from 'react-icons/fa';

const Services = () => {
    return (
        <section className='bg-slate-200 pt-10 pb-5'>
            <Container>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                        <LiaShippingFastSolid className='text-4xl' />
                        <div>
                            <h6 className='font-semibold text-sm'>Free Shipping</h6>
                            <p className='text-gray-800 text-xs'>From all orders over $5</p>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <LuGift className='text-4xl' />
                        <div>
                            <h6 className='font-semibold text-sm'>Daily Surprise Offer</h6>
                            <p className='text-gray-800 text-xs'>Save upto 25% off</p>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <ImHeadphones className='text-4xl' />
                        <div>
                            <h6 className='font-semibold text-sm'>Support 24/7</h6>
                            <p className='text-gray-800 text-xs'>Shop with an expert</p>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <BiSolidOffer className='text-4xl' />
                        <div>
                            <h6 className='font-semibold text-sm'>Affordable Prices</h6>
                            <p className='text-gray-800 text-xs'>Get Factory Default Price</p>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <FaRegCreditCard className='text-4xl' />
                        <div>
                            <h6 className='font-semibold text-sm'>Secure Payment</h6>
                            <p className='text-gray-800 text-xs'>100% Protected Payment</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Services;
