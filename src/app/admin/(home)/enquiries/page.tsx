import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';

const Enquiries = () => {
    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Enquiries' }]} />
            <Table title='Enquiries' />
        </div>
    );
};

export default Enquiries;
