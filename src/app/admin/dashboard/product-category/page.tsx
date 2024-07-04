'use client';
import Actions from '@/components/Admin/Acion';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllCategories } from '@/redux/features/categories/categorySlice';
import { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';

const Category = () => {
    const { categories, isLoading } = useAppSelector((state) => state.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!categories) {
            dispatch(getAllCategories());
        }
    }, [dispatch, categories]);

    const handleDelete = (categoryId: string) => {
        console.log(categoryId);
    };

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const dataSource = categories.map((category, index) => ({
        key: ++index,
        name: category.title,
        actions: <Actions Id={category._id} handleDelete={handleDelete} />,
    }));

    return (
        <div className='pb-10'>
            <BreadCrumb
                BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Product Category' }]}
            />
            <div className='bg-white px-10 py-5 rounded-md flex gap-4'>
                <Input
                    type='text'
                    name='title'
                    className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600 max-w-96'
                    placeholder='Category name'
                    autoComplete='off'
                />
                <Button className='py-5 bg-green-600 rounded-sm hover:bg-green-700'>Add Category</Button>
            </div>
            {isLoading ? <Loading /> : <Table title='Categories' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

export default Category;
