import { Axios, handleAxiosError } from '@/config/axios';
import { DeleteEnquiryType, EnquiryResType } from '@/types';

export const getEnquiries = async () => {
    try {
        const { data } = await Axios.get<EnquiryResType>('/enq/all-enq');
        return data.enquiries;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const deleteEnq = async (enuiryId: string) => {
    try {
        const { data } = await Axios.delete<DeleteEnquiryType>(`/enq/delete/${enuiryId}`);
        return data.enquiry._id;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
