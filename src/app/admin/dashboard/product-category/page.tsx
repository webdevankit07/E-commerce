'use client';
import Actions from '@/components/Admin/Acion';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { createCategory, deleteCategory, getAllCategories } from '@/redux/features/categories/categorySlice';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

const Category = () => {
    const { categories, isLoading, createLoading } = useAppSelector((state) => state.category);
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!categories.length) {
            dispatch(getAllCategories());
        }
    }, [dispatch, categories]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const handleDeleteCategory = async (categoryId: string) => {
        try {
            await dispatch(deleteCategory(categoryId));
        } catch (error) {
            toast.error(error as string);
        }
    };

    const dataSource = categories.map((category, index) => ({
        key: ++index,
        name: category.title,
        actions: (
            <Actions
                Id={category._id}
                handleDelete={handleDeleteCategory}
                dialougeDescription='This action cannot be undone. This will permanently delete this Category.'
            />
        ),
    }));

    const handleCreateBrand = async () => {
        try {
            await dispatch(createCategory(categoryName));
            setCategoryName('');
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <div className='pb-10'>
            <BreadCrumb
                BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Product Category' }]}
            />
            <div className='bg-white px-10 py-5 rounded-md flex gap-4'>
                <Input
                    type='text'
                    name='title'
                    value={categoryName}
                    className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600 max-w-96'
                    placeholder='Category name'
                    autoComplete='off'
                    onChange={(e) => setCategoryName(e.target.value)}
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
                        'Add Category'
                    )}
                </Button>
            </div>
            {isLoading ? <Loading /> : <Table title='Categories' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

export default Category;
