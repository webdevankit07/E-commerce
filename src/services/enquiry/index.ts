import { Axios, handleAxiosError } from '@/config/axios';
import { EnquiryResType } from '@/types';

export const getEnquiries = async () => {
    try {
        const { data } = await Axios.get<EnquiryResType>('/enq/all-enq');
        return data.enquiries;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
