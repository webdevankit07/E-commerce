import { SelectDataType } from '@/app/admin/dashboard/add-product/page';
import { CreateProductData, CreateProductInfo, UpdateProductInfo } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formateDate = (timestamp: Date) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
    });
    return { Date: formattedDate, Time: formattedTime };
};

//!
//!
//!
//! ********************  Add Product ********************* //

type SetSelectDataErrorsType = Dispatch<
    SetStateAction<{
        category: string;
        brand: string;
        colors: string;
    }>
>;
export const validateFormData = (
    formData: {
        title: string;
        description: string;
        price: number;
        quantity: number;
        images: File[];
    },
    selectData: SelectDataType,
    setSelectDataErrors: SetSelectDataErrorsType
) => {
    setSelectDataErrors({ category: '', brand: '', colors: '' });
    const { brand, category, colors } = selectData;

    let error = null;

    if (!category && !brand && !colors.length) {
        error = {
            category: 'please select product category',
            brand: 'please select product brand',
            colors: 'please select product color',
        };
    } else if (!brand && !colors.length) {
        error = {
            category: '',
            brand: 'please select product brand',
            colors: 'please select product color',
        };
    } else if (!colors.length && !category) {
        error = {
            category: 'please select product category',
            brand: '',
            colors: 'please select product colors',
        };
    } else if (!brand && !category) {
        error = {
            category: 'please select product category',
            brand: 'please select product brand',
            colors: '',
        };
    } else if (!category) {
        error = {
            category: 'please select product category',
            brand: '',
            colors: '',
        };
    } else if (!brand) {
        error = {
            category: '',
            brand: 'please select product brand',
            colors: '',
        };
    } else if (!colors.length) {
        error = {
            category: '',
            brand: '',
            colors: 'please select product colors',
        };
    }

    const productInfo: CreateProductInfo = {
        title: formData.title,
        description: formData.description,
        price: +formData.price,
        quantity: +formData.quantity,
        category: selectData.category,
        brand: selectData.brand,
        colors: selectData.colors,
    };

    const imageFiles = new FormData();
    Array.from(formData.images).forEach((imageFile) => imageFiles.append(`imageFiles`, imageFile));

    return { productInfo, imageFiles, error };
};
