import { Axios, handleAxiosError } from '@/config/axios';
import { LoginData, LoginResType } from '@/types';

export const login = async (userData: LoginData) => {
    try {
        const { data } = await Axios.post<LoginResType>(`/user/login`, userData);
        return data.user;
    } catch (error) {
        const err = await handleAxiosError(error);
        return err;
    }
};
