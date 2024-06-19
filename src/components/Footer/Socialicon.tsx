import Link from 'next/link';
import { IconType } from 'react-icons/lib';

interface SocialIconsProps {
    icon: IconType;
    url: string;
}

const Socialicon = ({ icon: Icon, url }: SocialIconsProps) => {
    return (
        <Link href={url} className='bg-white/[.5] hover:bg-white transition rounded-full'>
            <Icon className='text-gray-800 p-1  text-3xl' />
        </Link>
    );
};

export default Socialicon;
