import { Dispatch, SetStateAction } from 'react';

interface SetQuantityProps {
    quantity: number;
    setQuantity: Dispatch<SetStateAction<number>>;
}
const SetQuantity = ({ quantity, setQuantity }: SetQuantityProps) => {
    const handleQtyIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleQtyDecrease = () => {
        setQuantity(quantity - 1);
    };

    return (
        <div className='flex gap-8 items-center'>
            <div className='text-gray-700 font-bold text-xs'>QUANTITY: </div>
            <div className='flex gap-3 items-center text-base'>
                <button
                    disabled={quantity <= 1}
                    onClick={handleQtyDecrease}
                    className='border-[1.2px] border-slate-300 px-2 rounded'
                >
                    -
                </button>
                <div>{quantity < 10 ? `0${quantity}` : quantity}</div>
                <button
                    disabled={quantity >= 99}
                    className='border-[1.2px] border-slate-300 px-2 rounded'
                    onClick={handleQtyIncrease}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default SetQuantity;
