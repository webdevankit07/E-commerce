import { Axios, handleAxiosError } from '@/config/axios';
import {
    CouponResType,
    CouponType,
    CreateCouponDataType,
    CreateCouponResType,
    DeleteCouponResType,
    UpdateCouponDataType,
    UpdateCouponResType,
} from '@/types';
import toast from 'react-hot-toast';

export const getCoupons = async () => {
    try {
        const { data } = await Axios.get<CouponResType>(`/coupon/all-coupon`);
        return data.coupons;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const getCoupon = async (couponId: string) => {
    try {
        const { data } = await Axios.get<CouponType>(`/coupon/${couponId}`);
        return data;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.error(err);
        throw new Error(err);
    }
};

export const CreateCoupon = async (couponData: CreateCouponDataType) => {
    try {
        const { data } = await Axios.post<CreateCouponResType>(`/coupon/create`, couponData);
        return data.coupon;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};

export const UpdateCoupon = async (couponData: UpdateCouponDataType, couponId: string) => {
    try {
        const { data } = await Axios.put<UpdateCouponResType>(`/coupon/update/${couponId}`, couponData);
        return data.coupon;
    } catch (error) {
        const err = await handleAxiosError(error);
        toast.success(err);
        throw new Error(err);
    }
};

export const DeleteCoupon = async (couponId: string) => {
    try {
        const { data } = await Axios.delete<DeleteCouponResType>(`/coupon/delete/${couponId}`);
        return data.coupon._id;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
