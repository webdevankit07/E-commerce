import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';

const ProductList = () => {
    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Products' }]} />
            <Table title='All Products' />
        </div>
    );
};

export default ProductList;
