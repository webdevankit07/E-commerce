'use client';
import dynamic from 'next/dynamic';
const Column = dynamic(() => import('@ant-design/charts').then(({ Column }) => Column), { ssr: false });

const Chart = () => {
    const data = [
        { type: 'Jan', sales: 6787 },
        { type: 'Feb', sales: 9473 },
        { type: 'Mar', sales: 3689 },
        { type: 'Apr', sales: 12898 },
        { type: 'May', sales: 8369 },
        { type: 'Jun', sales: 3888 },
        { type: 'July', sales: 2789 },
        { type: 'Aug', sales: 10989 },
        { type: 'Sept', sales: 3389 },
        { type: 'Oct', sales: 15898 },
        { type: 'Nov', sales: 19898 },
        { type: 'Dec', sales: 8869 },
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
            text: (originData: any) => {
                const val = parseFloat(originData.value);
                if (val < 0.05) {
                    return (val * 100).toFixed(1) + '%';
                }
                return '';
            },
            offset: 10,
        },
        xAxis: { label: { autoHide: true, autoRotate: false } },
        meta: { type: { alias: 'Month' }, sales: { alias: 'Income' } },
        legend: false,
    };

    return (
        <div className='bg-white px-4 py-6 my-5 rounded-md shadow-md'>
            <h3 className='mb-10 font-semibold text-3xl'>Income Statics</h3>
            <Column {...config} />
        </div>
    );
};

export default Chart;
