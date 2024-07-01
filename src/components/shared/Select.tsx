import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SelectOptionPropsType {
    trigger: string;
    selectLabel?: string;
    selectItems: string[];
    onValueChange: (val: string) => void;
    className?: string;
}

const SelectOption = ({ trigger, selectLabel, selectItems, onValueChange, className }: SelectOptionPropsType) => {
    return (
        <Select onValueChange={onValueChange}>
            <SelectTrigger className={`bg-gray-100 border py-5 border-gray-600 rounded-sm ${className}`}>
                <SelectValue placeholder={trigger} className='bg-gray-100 border border-slate-800 font-bold' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
                    {selectItems.map((selectItem, index) => (
                        <SelectItem value={selectItem} className='capitalize' key={index}>
                            {selectItem}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectOption;
