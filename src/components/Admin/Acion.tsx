import { FiEdit } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RxCross2 } from 'react-icons/rx';
import { DialogClose } from '@radix-ui/react-dialog';

interface ActionsProps {
    Id: string;
    editBaseUrl?: string;
    dialougeDescription: string;
    handleDelete?: (Id: string) => void;
}

const Actions = ({ Id, handleDelete, editBaseUrl, dialougeDescription }: ActionsProps) => {
    return (
        <div className='flex gap-4'>
            {editBaseUrl && Id && (
                <Link href={`/admin/dashboard/${editBaseUrl}`}>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className='flex items-center gap-1.5 bg-green-600/[.2] text-green-800 border-green-800 px-5 py-1 font-semibold min-w-28'
                    >
                        <FiEdit />
                        Edit
                    </Button>
                </Link>
            )}
            {handleDelete && (
                <Dialog>
                    <DialogTrigger>
                        <Button
                            variant={'outline'}
                            size={'sm'}
                            value={Id}
                            className='flex items-center gap-1.5 bg-red-600/[.2] text-red-800 border-red-800 px-5 py-1 font-semibold min-w-28'
                        >
                            <MdDeleteSweep />
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='bg-dark-1 text-white border-none py-7'>
                        <DialogHeader className='space-y-2'>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>{dialougeDescription}</DialogDescription>
                        </DialogHeader>
                        <div className='flex gap-3 ml-auto mt-1'>
                            <DialogClose>
                                <Button
                                    variant={'secondary'}
                                    size={'sm'}
                                    value={Id}
                                    className='flex items-center gap-1.5 px-5 py-1 min-w-28'
                                >
                                    <RxCross2 />
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                variant={'destructive'}
                                size={'sm'}
                                value={Id}
                                className='flex items-center gap-1.5 px-5 py-1 min-w-28'
                                onClick={() => handleDelete(Id)}
                            >
                                <MdDeleteSweep />
                                Delete
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Actions;
