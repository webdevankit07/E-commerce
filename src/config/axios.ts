import axios, { AxiosError } from 'axios';
import { apiBaseUrl } from '.';

export type ValidationError = {
    message: string;
    error: string;
    errors: Record<string, string[]>;
};

export const Axios = axios.create({
    baseURL: '/api/v1',
    withCredentials: true,
});

export const handleAxiosError = async (error: unknown) => {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        const err = error.response?.data.error || error.response?.data.message;
        if (err) {
            return err;
        }
        return 'Something went wrong';
    } else {
        const err = error as Error;
        if (err) {
            return err.message;
        }
        return 'Something went wrong';
    }
};
