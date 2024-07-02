import { IconType } from 'react-icons/lib';

export type ServiceType = {
    Icon: IconType;
    title: string;
    subtitle: string;
};

export type CategoryType = {
    title: string;
    details: string;
    location: string;
    imgUrl: string;
};

export type ApiResposeType = {
    message: string;
    success: boolean;
};

// AuthSlice
export type UserResType = {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    mobile: string;
    role: 'user' | 'admin';
};

export type AuthInitialStateType = {
    user: UserResType | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};

export type LoginData = {
    identifier: string;
    password: string;
};

export type LoginResType = {
    user: UserResType;
    message: string;
    success: boolean;
};
