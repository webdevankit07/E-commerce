import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';

const Customers = () => {
    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Customers' }]} />
            <Table title='Customers' />
        </div>
    );
};

export default Customers;
