import { Dispatch, SetStateAction } from 'react';
import OrderFilterBtn from './OrderFilterBtn';

interface FilterButtonsProps {
    selectedBtnFilter: string;
    setSelectedBtnFilter: Dispatch<SetStateAction<string>>;
}

const FilterButtons = ({ selectedBtnFilter, setSelectedBtnFilter }: FilterButtonsProps) => {
    return (
        <div className='flex gap-4'>
            <OrderFilterBtn
                value='All'
                name='All'
                selectedBtnFilter={selectedBtnFilter}
                setSelectedBtnFilter={setSelectedBtnFilter}
            />
            <OrderFilterBtn
                value='In Progress'
                name='In Progress'
                selectedBtnFilter={selectedBtnFilter}
                setSelectedBtnFilter={setSelectedBtnFilter}
            />
            <OrderFilterBtn
                value='Dispatched'
                name='Dispatched'
                selectedBtnFilter={selectedBtnFilter}
                setSelectedBtnFilter={setSelectedBtnFilter}
            />
            <OrderFilterBtn
                value='Delivered'
                name='Delivered'
                selectedBtnFilter={selectedBtnFilter}
                setSelectedBtnFilter={setSelectedBtnFilter}
            />
            <OrderFilterBtn
                value='Cancelled'
                name=' Cancelled'
                selectedBtnFilter={selectedBtnFilter}
                setSelectedBtnFilter={setSelectedBtnFilter}
            />
        </div>
    );
};

export default FilterButtons;
