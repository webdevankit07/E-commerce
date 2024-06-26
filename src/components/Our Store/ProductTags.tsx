import { Badge } from '../ui/badge';

const ProductTags = () => {
    return (
        <section>
            <div className='bg-white rounded-md py-3 px-4'>
                <h3 className='font-semibold text-slate-700 mb-2.5'>Product Tags</h3>
                <div className='flex flex-wrap items-center gap-2'>
                    <Badge variant={'secondary'} className='cursor-pointer'>
                        HeadPhone
                    </Badge>
                    <Badge variant={'secondary'}>Laptop</Badge>
                    <Badge variant={'secondary'}>MI</Badge>
                    <Badge variant={'secondary'}>Samsung</Badge>
                    <Badge variant={'secondary'}>Mobile</Badge>
                    <Badge variant={'secondary'}>Vivo</Badge>
                    <Badge variant={'secondary'}>SmartPhones</Badge>
                </div>
            </div>
        </section>
    );
};

export default ProductTags;
