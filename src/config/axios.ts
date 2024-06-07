import axios from 'axios';
import { apiBaseUrl } from '.';

export type ValidationError = {
    message: string;
    errors: Record<string, string[]>;
};

export const Axios = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
});

export const handleAxiosError = async (error: unknown) => {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return error.response?.data.message;
    } else {
        const err = error as Error;
        return err.message;
    }
};
