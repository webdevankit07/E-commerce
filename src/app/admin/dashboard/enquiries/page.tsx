'use client';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllEnquiries, updateEnq } from '@/redux/features/enquiry/enquirySlice';
import { useEffect } from 'react';
import { Select, SelectValue, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import ShowDate from '@/components/shared/ShowDate';
import Actions from '@/components/Admin/Acion';
import toast from 'react-hot-toast';

interface Statustype {
    status: string;
    enqId: string;
}

const Enquiry = () => {
    const { enquiries, isLoading } = useAppSelector((state) => state.enquiry);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!enquiries.length) {
            dispatch(getAllEnquiries());
        }
    }, [dispatch, enquiries]);

    const handleDelete = (enqityId: string) => {
        console.log(enqityId);
    };

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Email', dataIndex: 'email', sorter: (a: any, b: any) => a.email.localeCompare(b.email) },
        { title: 'Mobile no.', dataIndex: 'mobile' },
        { title: 'Comment', dataIndex: 'comment' },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Date', dataIndex: 'date' },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const handleStateChange = async (value: Statustype) => {
        try {
            await dispatch(updateEnq({ status: value.status, enqId: value.enqId }));
            toast.success('Enquiry status changed');
        } catch (error) {
            console.log(error);
        }
    };

    const dataSource = enquiries.map((enquiry, index) => ({
        key: ++index,
        name: enquiry.name,
        email: enquiry.email,
        mobile: enquiry.mobile,
        comment: enquiry.comment,
        status: <Status status={enquiry.status} onChange={handleStateChange} enqId={enquiry._id} />,
        date: <ShowDate timestamp={enquiry.createdAt} />,
        actions: (
            <Actions
                Id={enquiry._id}
                handleDelete={handleDelete}
                dialougeDescription='This action cannot be undone. This will permanently delete this Enquiry.'
            />
        ),
    }));

    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Enquiries' }]} />
            {isLoading ? <Loading /> : <Table title='Enquiry' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

const Status = ({
    status,
    onChange,
    enqId,
}: {
    status: string;
    enqId: string;
    onChange: (value: Statustype) => void;
}) => {
    return (
        <Select onValueChange={(val) => onChange({ status: val, enqId })}>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value='Submitted'>Submitted</SelectItem>
                    <SelectItem value='Contacted'>Contacted</SelectItem>
                    <SelectItem value='In Progress'>In Progress</SelectItem>
                    <SelectItem value='Resolved'>Resolved</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default Enquiry;
