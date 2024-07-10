import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import ReactStars from 'react-stars';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { GiveratingResType, ProductType, RatingType } from '@/types';
import { Axios, handleAxiosError } from '@/config/axios';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

interface WriteReviewProps {
    productId: string;
    setProduct: Dispatch<SetStateAction<ProductType | undefined>>;
}

const WriteReview = ({ setProduct, productId }: WriteReviewProps) => {
    const [review, setReview] = useState({ star: 0, comment: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await Axios.put<GiveratingResType>(`product/review/${productId}`, review);
            setProduct(data.product);
            setReview({ star: 0, comment: '' });
            toast.success('Thanks for your feedback');
            setIsLoading(false);
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className='mt-5'>
            <h2 className='font-medium'>Write a Review</h2>
            <form className='text-sm mt-1' onSubmit={handleSubmit}>
                <ReactStars
                    count={5}
                    value={review.star}
                    size={30}
                    color2={'#ffd700'}
                    onChange={(val) => setReview({ ...review, star: val })}
                    edit={true}
                />
                <Textarea
                    id='name'
                    name='name'
                    className='bg-slate-50 rounded mt-3 resize-none'
                    rows={4}
                    placeholder='Comment'
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                />
                <div className='flex justify-end items-center'>
                    <Button className={`rounded-lg px-5 ml-auto mt-5 h-10 min-w-[130px]`}>
                        {isLoading ? (
                            <Oval
                                visible={true}
                                width={20}
                                color='#e8e8e8'
                                secondaryColor='#d3d3d3'
                                ariaLabel='oval-loading'
                                strokeWidth={3}
                            />
                        ) : (
                            'Submit Review'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default WriteReview;
