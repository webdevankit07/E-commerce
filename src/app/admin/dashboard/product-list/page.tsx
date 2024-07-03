'use client';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllProducts } from '@/redux/features/product/productSlice';
import { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';

const ProductList = () => {
    const { products, isLoading } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getAllProducts());
        }
    }, [dispatch, products]);

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Title', dataIndex: 'title', sorter: (a: any, b: any) => a.title.localeCompare(b.title) },
        { title: 'Price', dataIndex: 'price', sorter: (a: any, b: any) => a.price - b.price },
        { title: 'Brand', dataIndex: 'brand', sorter: (a: any, b: any) => a.brand.localeCompare(b.brand) },
        { title: 'Sold', dataIndex: 'sold', sorter: (a: any, b: any) => a.sold - b.sold },
        { title: 'Qyantity', dataIndex: 'quantity', sorter: (a: any, b: any) => a.quantity - b.quantity },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const dataSource = products.map((product, index) => ({
        key: ++index,
        title: product.title,
        price: product.price,
        brand: product.brand,
        sold: product.sold,
        quantity: product.quantity,
        actions: <Action productId={product._id} />,
    }));

    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Products' }]} />
            {isLoading ? <Loading /> : <Table title='Products' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

const Action = ({ productId }: { productId: string }) => {
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

export default ProductList;
