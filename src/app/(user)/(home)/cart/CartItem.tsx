import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';
import { MdDeleteForever } from 'react-icons/md';

const CartItem = () => {
    return (
        <TableRow>
            <TableCell className='pr-10'>
                <Link href={'/products/asdbahsbdj'} className='flex items-center gap-5'>
                    <div>
                        <Image src={'/images/headphone.webp'} width={80} height={80} alt='cartProduct-img' />
                    </div>
                    <div className='space-y-1'>
                        <p className='font-medium'>Kids Headphones bulk 10 pack multi colored for students</p>
                        <div>
                            <span className='font-medium mr-2'>Size: </span>
                            <span>5</span>
                        </div>
                        <div>
                            <span className='font-medium mr-2'>Color: </span>
                            <span>#23254</span>
                        </div>
                    </div>
                </Link>
            </TableCell>
            <TableCell className='font-medium text-center'>$100000</TableCell>
            <TableCell className='text-center'>5</TableCell>
            <TableCell className='text-center'>
                <Button size={'sm'} variant={'destructive'} className='space-x-1 rounded-sm'>
                    <MdDeleteForever className='text-lg' />
                    <span>Delete</span>
                </Button>
            </TableCell>
            <TableCell className='text-right font-medium'>$100000</TableCell>
        </TableRow>
    );
};

export default CartItem;
