'use client';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { getAllEnquiries } from '@/redux/features/enquiry/enquirySlice';
import { useEffect } from 'react';
import { MdDeleteSweep } from 'react-icons/md';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import ShowDate from '@/components/shared/ShowDate';
import Actions from '@/components/Admin/Acion';

const Enquiry = () => {
    const { enquiries, isLoading } = useAppSelector((state) => state.enquiry);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!enquiries) {
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

    const handleStateChange = (value: string) => {
        console.log(value);
    };

    const dataSource = enquiries.map((enquiry, index) => ({
        key: ++index,
        name: enquiry.name,
        email: enquiry.email,
        mobile: enquiry.mobile,
        comment: enquiry.comment,
        status: <Status status={enquiry.status} onChange={handleStateChange} />,
        date: <ShowDate timestamp={enquiry.createdAt} />,
        actions: <Actions Id={enquiry._id} handleDelete={handleDelete} />,
    }));

    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Enquiries' }]} />
            {isLoading ? <Loading /> : <Table title='Enquiry' columns={columns} dataSource={dataSource} />}
        </div>
    );
};

const Status = ({ status, onChange }: { status: string; onChange: (value: string) => void }) => {
    return (
        <Select onValueChange={onChange}>
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
