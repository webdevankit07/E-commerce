'use client';
import Actions from '@/components/Admin/Acion';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { handleAxiosError } from '@/config/axios';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { deleteProduct, getAllProducts } from '@/redux/features/product/productSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ProductList = () => {
    const { products, isLoading, message, isError, isProductEditing, isProductDeleting } = useAppSelector(
        (state) => state.product
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!products) {
            dispatch(getAllProducts());
        }
    }, [dispatch, products]);

    const handleDelete = async (productId: string) => {
        try {
            await dispatch(deleteProduct(productId));
            if (isError) {
                toast.error(`${message}`);
            } else {
                toast.success('Product deleted');
            }
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
        }
    };

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
        actions: (
            <Actions
                Id={product._id}
                editBaseUrl={`/edit-product/${product._id}`}
                handleDelete={handleDelete}
                isDeleting={isProductDeleting}
                isEditing={isProductEditing}
            />
        ),
    }));

    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Products' }]} />
            {isLoading ? <Loading /> : <Table title='Products' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

export default ProductList;
