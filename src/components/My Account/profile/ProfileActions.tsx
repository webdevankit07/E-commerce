import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { MdDeleteSweep } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';
import { PiSignOutBold } from 'react-icons/pi';
import { RiLockPasswordFill } from 'react-icons/ri';

interface ProfileActionsTypes {
    handleDeleteAccount: () => void;
    handleSignOut: () => void;
}

const ProfileActions = ({ handleDeleteAccount, handleSignOut }: ProfileActionsTypes) => {
    return (
        <section className='flex flex-wrap items-center gap-2 flex-grow mt-5'>
            {/* //! Delete Account...  */}
            <Dialog>
                <DialogTrigger className='flex-1'>
                    <div className='flex items-center justify-center gap-1.5 py-2 rounded-md text-xs bg-red-600/[.2] hover:bg-red-300/[.2] text-red-800 border border-red-900 px-5 font-semibold transition-all duration-200 ease-in-out text-nowrap'>
                        <MdDeleteSweep />
                        Delete Account
                    </div>
                </DialogTrigger>
                <DialogContent className='bg-dark-1 text-white border-none py-7'>
                    <DialogHeader className='space-y-2'>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data
                            from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex gap-3 ml-auto mt-1'>
                        <DialogClose>
                            <Button
                                variant={'secondary'}
                                size={'sm'}
                                className='flex items-center gap-1.5 px-5 py-1 min-w-28'
                            >
                                <RxCross2 />
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose>
                            <Button
                                variant={'destructive'}
                                size={'sm'}
                                className='flex items-center gap-1.5 px-5 py-1 min-w-28'
                                onClick={handleDeleteAccount}
                            >
                                <MdDeleteSweep />
                                Delete
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>

            {/* //! Update Password...  */}
            <Link href={'/my-account/update-password'} className='flex-1'>
                <div className='flex flex-1 items-center justify-center gap-1.5 py-2 rounded-md text-xs bg-red-600/[.2] hover:bg-red-300/[.2] text-red-800 border border-red-900 px-5 font-semibold transition-all duration-200 ease-in-out text-nowrap'>
                    <RiLockPasswordFill />
                    Update Password
                </div>
            </Link>

            {/* //! Sign Out...  */}
            <Dialog>
                <DialogTrigger className='flex-1'>
                    <div className='flex flex-1 items-center justify-center gap-1.5 py-2 rounded-md text-xs bg-red-600/[.2] hover:bg-red-300/[.2] text-red-800 border border-red-900 px-5 font-semibold transition-all duration-200 ease-in-out text-nowrap'>
                        <PiSignOutBold />
                        Sign Out
                    </div>
                </DialogTrigger>
                <DialogContent className='bg-dark-1 text-white border-none py-7'>
                    <DialogHeader className='space-y-2'>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>This will sign out your account.</DialogDescription>
                    </DialogHeader>
                    <div className='flex gap-3 ml-auto mt-1'>
                        <DialogClose>
                            <Button
                                variant={'secondary'}
                                size={'sm'}
                                className='flex items-center gap-1.5 px-5 py-1 min-w-28'
                            >
                                <RxCross2 />
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose>
                            <Button
                                variant={'destructive'}
                                size={'sm'}
                                className='flex items-center gap-1.5 px-5 py-1 min-w-28'
                                onClick={handleSignOut}
                            >
                                <PiSignOutBold />
                                Sign Out
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default ProfileActions;
