import { Axios, handleAxiosError } from '@/config/axios';
import { UserResType } from '@/types';

export const getUsers = async () => {
    try {
        const { data } = await Axios.get<{ users: UserResType[] }>('/user/all-users');
        return data.users;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
