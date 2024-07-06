'use client';
import Actions from '@/components/Admin/Acion';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { createBrand, deleteBrand, getAllBrands } from '@/redux/features/brand/brandSlice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

const Brand = () => {
    const { brands, isLoading, createLoading } = useAppSelector((state) => state.brand);
    const [brandName, setBrandName] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!brands.length) {
            dispatch(getAllBrands());
        }
    }, [dispatch, brands]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const handleDeleteBrand = async (brandId: string) => {
        try {
            await dispatch(deleteBrand(brandId));
        } catch (error) {
            toast.error(error as string);
        }
    };

    const dataSource = brands.map((brand, index) => ({
        key: ++index,
        name: brand.name,
        actions: <Actions Id={brand._id} handleDelete={handleDeleteBrand} />,
    }));

    const handleCreateBrand = async () => {
        try {
            await dispatch(createBrand(brandName));
            setBrandName('');
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <div className='pb-10'>
            <BreadCrumb
                BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Product Brand' }]}
            />
            <div className='bg-white px-10 py-5 rounded-md flex gap-4'>
                <Input
                    type='text'
                    name='title'
                    value={brandName}
                    className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600 max-w-96'
                    placeholder='Brand name'
                    autoComplete='off'
                    onChange={(e) => setBrandName(e.target.value)}
                />
                <Button
                    className='py-5 bg-green-600 rounded-sm hover:bg-green-700 min-w-[100px]'
                    onClick={handleCreateBrand}
                >
                    {createLoading ? (
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
                        'Add Brand'
                    )}
                </Button>
            </div>
            {isLoading ? <Loading /> : <Table title='Brands' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

export default Brand;
