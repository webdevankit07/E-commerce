import { Axios, handleAxiosError } from '@/config/axios';
import { LoginData, LoginResType } from '@/types';

export const login = async (isAdmin: boolean, userData: LoginData) => {
    try {
        let res;
        if (isAdmin) {
            res = await Axios.post(`/admin/login`, userData);
        } else {
            console.log('user login');
            res = await Axios.post(`/user/login`, userData);
        }

        const { user } = res.data as LoginResType;
        return user;
    } catch (error) {
        const err = await handleAxiosError(error);
        return err;
    }
};
