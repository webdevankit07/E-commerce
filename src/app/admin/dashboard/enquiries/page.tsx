'use client';
import Table from '@/components/Admin/Table';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { deleteEnq, getAllEnquiries, updateEnq } from '@/redux/features/enquiry/enquirySlice';
import { useEffect } from 'react';
import { Select, SelectValue, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import ShowDate from '@/components/shared/ShowDate';
import Actions from '@/components/Admin/Acion';
import { EnquiryType } from '@/types';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FaEye } from 'react-icons/fa';

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

    const handleDelete = async (enquiryId: string) => {
        await dispatch(deleteEnq(enquiryId));
    };

    const formatComment = (comment: string) => {
        if (comment.length <= 25) return comment;
        return `${comment.slice(0, 25)}...`;
    };

    const columns = [
        { title: 'SI.No.', dataIndex: 'key' },
        { title: 'Name', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
        { title: 'Email', dataIndex: 'email', sorter: (a: any, b: any) => a.email.localeCompare(b.email) },
        { title: 'Mobile no.', dataIndex: 'mobile' },
        { title: 'Comment', dataIndex: 'comment' },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Date', dataIndex: 'date' },
        { title: 'View', dataIndex: 'view' },
        { title: 'Actions', dataIndex: 'actions' },
    ];

    const handleStateChange = async (value: Statustype) => {
        await dispatch(updateEnq({ status: value.status, enqId: value.enqId }));
    };

    const dataSource = enquiries.map((enquiry, index) => ({
        key: ++index,
        name: enquiry.name,
        email: enquiry.email,
        mobile: enquiry.mobile,
        comment: formatComment(enquiry.comment),
        status: <Status status={enquiry.status} onChange={handleStateChange} enqId={enquiry._id} />,
        date: <ShowDate timestamp={enquiry.createdAt} />,
        view: <ViewEnquiry enquiry={enquiry} handleStateChange={handleStateChange} />,
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

type StatusPropsType = {
    status: string;
    enqId: string;
    onChange: (value: Statustype) => void;
    triggerClassName?: string;
    contentClassName?: string;
};
const Status = ({ status, onChange, enqId, triggerClassName, contentClassName }: StatusPropsType) => {
    return (
        <Select onValueChange={(val) => onChange({ status: val, enqId })}>
            <SelectTrigger className={`w-[180px] ${triggerClassName}`}>
                <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent className={`${contentClassName}`}>
                <SelectGroup className={`*:cursor-pointer`}>
                    <SelectItem value='Submitted'>Submitted</SelectItem>
                    <SelectItem value='Contacted'>Contacted</SelectItem>
                    <SelectItem value='In Progress'>In Progress</SelectItem>
                    <SelectItem value='Resolved'>Resolved</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const ViewEnquiry = ({
    enquiry,
    handleStateChange,
}: {
    enquiry: EnquiryType;
    handleStateChange: (val: Statustype) => void;
}) => {
    return (
        <Dialog>
            <DialogTrigger className='min-w-[50px]'>
                <FaEye className='text-xl' />
            </DialogTrigger>
            <DialogContent className='bg-dark-1 text-white border-none font-[100] text-sm w-full px-7 py-8 *:flex *:items-center *:gap-3'>
                <div>
                    <span>Name : </span>
                    <h2>{enquiry.name}</h2>
                </div>
                <div>
                    <span>Email : </span>
                    <h2>{enquiry.email}</h2>
                </div>
                <div>
                    <span>Mobile no. : </span>
                    <h2>{enquiry.mobile}</h2>
                </div>
                <div>
                    <span>Date : </span>
                    <h2>
                        <ShowDate timestamp={enquiry.createdAt} />
                    </h2>
                </div>
                <div className='flex-col items-start gap-0'>
                    <span className='mr-auto'>Comment : </span>
                    <div className='py-2 px-2 bg-slate-800/[.3] border rounded'>{enquiry.comment}</div>
                </div>
                <div className='mt-5'>
                    <span>Status : </span>
                    <Status
                        status={enquiry.status}
                        onChange={handleStateChange}
                        enqId={enquiry._id}
                        contentClassName='bg-dark-1 text-slate-100'
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Enquiry;
