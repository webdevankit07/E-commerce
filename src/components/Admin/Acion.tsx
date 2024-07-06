import { FiEdit } from 'react-icons/fi';
import { Button } from '../ui/button';
import { MdDeleteSweep } from 'react-icons/md';
import { Oval } from 'react-loader-spinner';
import Link from 'next/link';
import { useState } from 'react';

interface ActionsProps {
    Id: string;
    editBaseUrl?: string;
    handleDelete?: (Id: string) => void;
    handleEdit?: (Id: string) => void;
}

const Actions = ({ Id, handleDelete, editBaseUrl, handleEdit }: ActionsProps) => {
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
                <Button
                    variant={'outline'}
                    size={'sm'}
                    value={Id}
                    className='flex items-center gap-1.5 bg-red-600/[.2] text-red-800 border-red-800 px-5 py-1 font-semibold min-w-28'
                    onClick={() => handleDelete(Id)}
                >
                    <MdDeleteSweep />
                    Delete
                </Button>
            )}
        </div>
    );
};

export default Actions;
