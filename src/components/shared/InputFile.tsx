import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function InputFile({ label }: { label?: string }) {
    return (
        <div className='grid w-full items-center gap-1.5'>
            {label && <Label htmlFor='picture'>Picture</Label>}
            <Input
                id='file-choose'
                type='file'
                multiple
                className='bg-gray-100 w-full rounded-sm focus:outline-gray-500 border border-gray-600'
            />
        </div>
    );
}
