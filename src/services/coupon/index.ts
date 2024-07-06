import { Axios, handleAxiosError } from '@/config/axios';
import { CouponResType, CreateCouponDataType, CreateCouponResType, DeleteCouponResType } from '@/types';

export const getCoupons = async () => {
    try {
        const { data } = await Axios.get<CouponResType>(`/coupon/all-coupon`);
        return data.coupons;
    } catch (error) {
        const err = await handleAxiosError(error);
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

export const DeleteCoupon = async (couponId: string) => {
    try {
        const { data } = await Axios.delete<DeleteCouponResType>(`/coupon/delete/${couponId}`);
        return data.coupon._id;
    } catch (error) {
        const err = await handleAxiosError(error);
        throw new Error(err);
    }
};
