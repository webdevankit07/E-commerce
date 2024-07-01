import { Table as AntTable } from 'antd';

const Table = ({ title }: { title: string }) => {
    const columns = [
        { title: 'SNo', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Product', dataIndex: 'product' },
        { title: 'Address', dataIndex: 'address' },
    ];

    const ordersData: { key: number; name: string; product: number; address: string }[] = [];
    for (let i = 0; i < 46; i++) {
        ordersData.push({
            key: i,
            name: `Edward King ${i}`,
            product: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }

    return (
        <div className='bg-white px-10 pt-5 rounded-md mt-4'>
            <h3 className='font-medium text-2xl mb-5'>{title}</h3>
            <AntTable columns={columns} dataSource={ordersData} />;
        </div>
    );
};

export default Table;
