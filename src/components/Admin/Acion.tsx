import { FiEdit } from 'react-icons/fi';
import { Button } from '../ui/button';
import { MdDeleteSweep } from 'react-icons/md';
import { Oval } from 'react-loader-spinner';
import Link from 'next/link';
import { useState } from 'react';

interface ActionsProps {
    Id: string;
    isEditing?: boolean;
    isDeleting?: boolean;
    editBaseUrl?: string;
    handleDelete?: (Id: string) => void;
}

const Actions = ({ Id, handleDelete, isEditing, isDeleting, editBaseUrl }: ActionsProps) => {
    const [isDelBtnLoading, setIsDelBtnLoading] = useState(false);

    const handleDelLoading = (val: string) => {
        if (isDeleting) {
            setIsDelBtnLoading(true);
        } else {
            setIsDelBtnLoading(false);
        }
    };

    return (
        <div className='flex gap-4'>
            {editBaseUrl && Id && (
                <Link href={`/admin/dashboard/${editBaseUrl}`}>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className='flex items-center gap-1.5 bg-green-600/[.2] text-green-800 border-green-800 px-5 py-1 font-semibold min-w-28'
                    >
                        {isEditing ? (
                            <Oval
                                visible={true}
                                width={20}
                                height={20}
                                color='#ececec'
                                secondaryColor='#c4c4c4'
                                ariaLabel='oval-loading'
                                strokeWidth={3}
                            />
                        ) : (
                            <>
                                <FiEdit />
                                Edit
                            </>
                        )}
                    </Button>
                </Link>
            )}
            {handleDelete && (
                <Button
                    variant={'outline'}
                    size={'sm'}
                    value={Id}
                    className='flex items-center gap-1.5 bg-red-600/[.2] text-red-800 border-red-800 px-5 py-1 font-semibold min-w-28'
                    onClick={(e: any) => {
                        handleDelLoading(e.target.value);
                        handleDelete(Id);
                    }}
                >
                    {isDelBtnLoading ? (
                        <Oval
                            visible={true}
                            width={20}
                            height={20}
                            color='#820000'
                            secondaryColor='#f330308d'
                            ariaLabel='oval-loading'
                            strokeWidth={3}
                        />
                    ) : (
                        <>
                            <MdDeleteSweep />
                            Delete
                        </>
                    )}
                </Button>
            )}
        </div>
    );
};

export default Actions;
