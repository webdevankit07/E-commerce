'use client';
import dynamic from 'next/dynamic';
const Column = dynamic(() => import('@ant-design/charts').then(({ Column }) => Column), { ssr: false });

const Chart = () => {
    const data = [
        { type: 'Jan', sales: 38 },
        { type: 'Feb', sales: 52 },
        { type: 'Mar', sales: 61 },
        { type: 'Apr', sales: 110 },
        { type: 'May', sales: 48 },
        { type: 'Jun', sales: 38 },
        { type: 'July', sales: 80 },
        { type: 'Aug', sales: 15 },
        { type: 'Sept', sales: 45 },
        { type: 'Oct', sales: 57 },
        { type: 'Nov', sales: 76 },
        { type: 'Dec', sales: 33 },
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

    return <Column {...config} className={'max-w-[90%]'} />;
};

export default Chart;
