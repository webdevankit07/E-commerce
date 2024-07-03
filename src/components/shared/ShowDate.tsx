import { formateDate } from '@/lib/utils';

const ShowDate = ({ timestamp }: { timestamp: Date }) => {
    const { Date, Time } = formateDate(timestamp);

    return (
        <p>
            {Date}, {Time}
        </p>
    );
};

export default ShowDate;
