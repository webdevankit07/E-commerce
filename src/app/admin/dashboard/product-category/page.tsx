import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Category = () => {
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
            {/* <Table title='Product Categories' />por */}
        </div>
    );
};

export default Category;
