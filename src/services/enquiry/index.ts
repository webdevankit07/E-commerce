import { Axios, handleAxiosError } from '@/config/axios';
import { DeleteEnquiryType, EnquiryResType, UpdateEnqType } from '@/types';
import toast from 'react-hot-toast';

export const getEnquiries = async () => {
    try {
        const { data } = await Axios.get<EnquiryResType>('/enq/all-enq');
        return data.enquiries;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const UpdateEnq = async (status: string, enqId: string) => {
    try {
        const { data } = await Axios.put<UpdateEnqType>(`/enq/update/${enqId}`, { status });
        return data.enquiry;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const DeleteEnq = async (enuiryId: string) => {
    try {
        const { data } = await Axios.delete<DeleteEnquiryType>(`/enq/delete/${enuiryId}`);
        return data.enquiry._id;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
