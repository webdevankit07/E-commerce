import { Dispatch, SetStateAction } from 'react';

interface SetQuantityProps {
    quantity: number;
    setQuantity: Dispatch<SetStateAction<number>>;
    updateCart: (...args: any[]) => void;
}
const SetCartProductQuantity = ({ quantity, setQuantity, updateCart }: SetQuantityProps) => {
    const handleQtyIncrease = () => {
        setQuantity(quantity + 1);
        const updatedQuantity = quantity + 1;
        updateCart(updatedQuantity);
    };

    const handleQtyDecrease = () => {
        setQuantity(quantity - 1);
        const updatedQuantity = quantity - 1;
        updateCart(updatedQuantity);
    };

    return (
        <div className='flex items-center justify-center'>
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

export default SetCartProductQuantity;
