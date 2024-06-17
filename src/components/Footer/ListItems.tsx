import Link from 'next/link';

interface ListItemsProps {
    url: string;
    name: string;
}

const ListItems = ({ name, url }: ListItemsProps) => {
    return (
        <Link href={url} className='block mb-2 text-gray-400'>
            {name}
        </Link>
    );
};

export default ListItems;
