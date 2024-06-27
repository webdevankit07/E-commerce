import { FormEvent } from 'react';
import ReactStars from 'react-stars';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const WriteReview = () => {
    const handleRating = (newRating: number) => {
        console.log(newRating);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className='mt-5'>
            <h2 className='font-medium'>Write a Review</h2>
            <form className='text-sm mt-1' onSubmit={handleSubmit}>
                <ReactStars count={5} value={4} size={20} color2={'#ffd700'} onChange={handleRating} edit={true} />
                <Textarea
                    id='name'
                    name='name'
                    className='bg-slate-50 rounded mt-1 resize-none'
                    rows={4}
                    placeholder='Comment'
                />
                <div className='w-full'>
                    <Button className='rounded-2xl px-5 block mt-5 ml-auto mr-1'>Submit Review</Button>
                </div>
            </form>
        </div>
    );
};

export default WriteReview;
