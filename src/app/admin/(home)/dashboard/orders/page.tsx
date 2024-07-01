import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';

const Orders = () => {
    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Orders' }]} />
            <Table title='Orders' />
        </div>
    );
};

export default Orders;
