import { Table as AntTable } from 'antd';

const Table = () => {
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
        <div className='bg-white px-10 py-6 my-5 rounded-md shadow-md'>
            <h3 className='mb-10 font-semibold text-3xl'>Recent Orders</h3>
            <AntTable columns={columns} dataSource={ordersData} />
        </div>
    );
};

export default Table;
