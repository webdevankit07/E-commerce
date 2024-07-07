'use client';
import Actions from '@/components/Admin/Acion';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { createColor, deleteColor, getAllColors } from '@/redux/features/color/colorSlice';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';

const Color = () => {
    const { colors, isLoading, createLoading } = useAppSelector((state) => state.color);
    const [colorName, setColorName] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!colors.length) {
            dispatch(getAllColors());
        }
    }, [dispatch, colors]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const handleDeleteColor = async (colorId: string) => {
        await dispatch(deleteColor(colorId));
    };

    const dataSource = colors.map((color, index) => ({
        key: ++index,
        name: color.name,
        actions: (
            <Actions
                Id={color._id}
                handleDelete={handleDeleteColor}
                dialougeDescription='This action cannot be undone. This will permanently delete this Color.'
            />
        ),
    }));

    const handleCreateColor = async () => {
        await dispatch(createColor(colorName));
        setColorName('');
    };

    return (
        <div className='pb-10'>
            <BreadCrumb
                BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Product Color' }]}
            />
            <div className='bg-white px-10 py-5 rounded-md flex gap-4'>
                <Input
                    type='text'
                    name='title'
                    value={colorName}
                    className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600 max-w-96'
                    placeholder='Color name'
                    autoComplete='off'
                    onChange={(e) => setColorName(e.target.value)}
                />

                <Button
                    className='py-5 bg-green-600 rounded-sm hover:bg-green-700 min-w-[100px]'
                    onClick={handleCreateColor}
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
                        'Add Color'
                    )}
                </Button>
            </div>
            {isLoading ? <Loading /> : <Table title='Colors' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

export default Color;
