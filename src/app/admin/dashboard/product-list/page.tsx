'use client';
import Actions from '@/components/Admin/Acion';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { deleteProduct, getAllProducts } from '@/redux/features/product/productSlice';
import { useEffect } from 'react';

const ProductList = () => {
    const { products, isLoading, isProductDeleting } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!products.length) {
            dispatch(getAllProducts());
        }
    }, [dispatch, products]);

    const handleDelete = async (productId: string) => {
        await dispatch(deleteProduct(productId));
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
                editBaseUrl={`update-product/${product._id}`}
                handleDelete={handleDelete}
                dialougeDescription='This action cannot be undone. This will permanently delete this product.'
            />
        ),
    }));

    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Products' }]} />
            {isLoading || isProductDeleting ? (
                <Loading />
            ) : (
                <Table title='Products' columns={columns} dataSource={dataSource} />
            )}
        </div>
    );
};

export default ProductList;
