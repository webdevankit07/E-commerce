import { Axios, handleAxiosError } from '@/config/axios';
import { ColorResType } from '@/types';

export const getColors = async () => {
    try {
        const { data } = await Axios.get<ColorResType>(`/color/all-colors`);
        return data.colors;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
