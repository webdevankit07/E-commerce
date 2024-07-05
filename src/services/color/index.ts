import { Axios, handleAxiosError } from '@/config/axios';
import { ColorResType, CreateColorResType, DeleteColorResType } from '@/types';

export const getColors = async () => {
    try {
        const { data } = await Axios.get<ColorResType>(`/color/all-colors`);
        return data.colors;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const createColor = async (name: string) => {
    try {
        const { data } = await Axios.post<CreateColorResType>(`/color/create`, { name });
        return data.newColor;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const deleteColor = async (colorId: string) => {
    try {
        const { data } = await Axios.delete<DeleteColorResType>(`/color/delete/${colorId}`);
        return data.color._id;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
