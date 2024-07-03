'use client';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllBrands } from '@/redux/features/brand/brandSlice';
import { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';

const Brand = () => {
    const { brands, isLoading } = useAppSelector((state) => state.brand);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!brands || brands.length === 0) {
            dispatch(getAllBrands());
        }
    }, [dispatch, brands]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const dataSource = brands.map((brand, index) => ({
        key: ++index,
        name: brand.name,
        actions: <Action brandId={brand._id} />,
    }));

    return (
        <div className='pb-10'>
            <BreadCrumb
                BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Product Brand' }]}
            />
            <div className='bg-white px-10 py-5 rounded-md flex gap-4'>
                <Input
                    type='text'
                    name='title'
                    className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600 max-w-96'
                    placeholder='Brand name'
                    autoComplete='off'
                />
                <Button className='py-5 bg-green-600 rounded-sm hover:bg-green-700'>Add Brand</Button>
            </div>
            {isLoading ? <Loading /> : <Table title='Brands' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

const Action = ({ brandId }: { brandId: string }) => {
    return (
        <div className='flex gap-4'>
            <Button
                variant={'outline'}
                size={'sm'}
                className='flex items-center gap-1.5 bg-green-600/[.2] text-green-800 border-green-800 px-5 py-1 font-semibold'
            >
                <FiEdit />
                Edit
            </Button>
            <Button
                variant={'outline'}
                size={'sm'}
                className='flex items-center gap-1.5 bg-red-600/[.2] text-red-800 border-red-800 px-5 py-1 font-semibold'
            >
                <MdDeleteSweep />
                Delete
            </Button>
        </div>
    );
};

export default Brand;
