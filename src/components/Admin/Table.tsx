import { Table as AntTable } from 'antd';

interface TableProps {
    title: string;
    columns: { title: string; dataIndex: string }[];
    dataSource: object[];
}

const Table = ({ title, columns, dataSource }: TableProps) => {
    return (
        <div className='bg-white px-10 pt-5 rounded-md mt-4'>
            <h3 className='font-medium text-2xl mb-5'>{title}</h3>
            <AntTable columns={columns} dataSource={dataSource} />
        </div>
    );
};

export default Table;
