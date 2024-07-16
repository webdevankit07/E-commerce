import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';

interface OrderFilterBtnPropsType {
    value: string;
    name: string;
    selectedBtnFilter: string;
    setSelectedBtnFilter: Dispatch<SetStateAction<string>>;
}

const OrderFilterBtn = ({ value, name, selectedBtnFilter, setSelectedBtnFilter }: OrderFilterBtnPropsType) => {
    return (
        <Button
            value={value}
            variant={'outline'}
            className={`rounded-2xl max-md:px-3 py-0 px-4 bg-transparent hover:bg-transparent text-slate-700 border-slate-400 hover:text-orange-900 hover:border-orange-900 max-sm:text-[11px] max-md:text-xs ${
                selectedBtnFilter === value && 'text-orange-900 border-orange-900'
            }`}
            onClick={() => setSelectedBtnFilter(value)}
        >
            {name}
        </Button>
    );
};

export default OrderFilterBtn;
