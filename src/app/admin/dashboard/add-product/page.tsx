'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import SelectOption from '@/components/shared/Select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { handleAxiosError } from '@/config/axios';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { validateFormData } from '@/lib/utils';
import { createProduct } from '@/redux/features/product/productSlice';
import { CreateProductData } from '@/types';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export interface SelectDataType {
    category: string;
    brand: string;
    colors: string[];
}

const AddProduct = () => {
    const { isLoading, isError, message } = useAppSelector((state) => state.product);
    const { categories } = useAppSelector((state) => state.category);
    const { brands } = useAppSelector((state) => state.brand);
    const { colors } = useAppSelector((state) => state.color);
    const [selectData, setSelectData] = useState<SelectDataType>({ category: '', brand: '', colors: [] });
    const [selectDataErrors, setSelectDataErrors] = useState({ category: '', brand: '', colors: '' });
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProductData>();

    const Categories = categories.map((category) => category.title);
    const Brands = brands.map((brand) => brand.name);
    const Colors = colors.map((color) => color.name);

    const handleFormSubmit: SubmitHandler<CreateProductData> = async (formData) => {
        const { productInfo, imageFiles, error } = validateFormData(formData, selectData, setSelectDataErrors);
        if (error) return setSelectDataErrors(error);

        try {
            await dispatch(createProduct({ productInfo, imageFiles }));
            if (isError) {
                toast.success(`${message}`);
            } else {
                toast.success('Product created');
            }
        } catch (error) {
            const err = await handleAxiosError(error);
            toast.error(err);
        }
    };

    return (
        <div className='pb-10'>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Add Product' }]} />
            <div className='bg-white px-10 py-10 rounded-md shadow-md'>
                <h3 className='font-medium text-[28px] mb-5'>Add Product</h3>
                <div>
                    <form className='space-y-8'>
                        <div className='relative'>
                            <Input
                                type='text'
                                className='bg-gray-100 w-full py-6 rounded-sm focus:outline-gray-500 border border-gray-600'
                                placeholder='Product Title'
                                autoComplete='off'
                                {...register('title', {
                                    required: { value: true, message: 'title is required' },
                                    minLength: { value: 3, message: 'title must be atleast 3 characters' },
                                    maxLength: { value: 100, message: 'title must be atmost 100 characters' },
                                })}
                            />
                            <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                {errors.title?.message}
                            </span>
                        </div>
                        <div className='relative'>
                            <Textarea
                                className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600 resize-none'
                                placeholder='Description'
                                autoComplete='off'
                                rows={5}
                                {...register('description', {
                                    required: { value: true, message: 'description is required' },
                                    minLength: { value: 50, message: 'description must be atleast 50 characters' },
                                    maxLength: { value: 2000, message: 'description is to long' },
                                })}
                            />
                            <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                {errors.description?.message}
                            </span>
                        </div>

                        <div className='flex  gap-4'>
                            <div className='w-full relative'>
                                <Input
                                    type='number'
                                    className='bg-gray-100 w-full py-6 rounded-sm focus:outline-gray-500 border border-gray-600'
                                    placeholder='Product Price'
                                    autoComplete='off'
                                    {...register('price', {
                                        required: { value: true, message: 'price is required' },
                                    })}
                                />
                                <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                    {errors.price?.message}
                                </span>
                            </div>
                            <div className='w-full relative'>
                                <Input
                                    type='number'
                                    className='bg-gray-100 w-full py-6 rounded-sm focus:outline-gray-500 border border-gray-600'
                                    placeholder='Product Quantity'
                                    autoComplete='off'
                                    {...register('quantity', {
                                        required: { value: true, message: 'quantity is required' },
                                    })}
                                />
                                <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                    {errors.quantity?.message}
                                </span>
                            </div>
                        </div>
                        <div className='flex gap-4 *:w-full *:relative'>
                            <div>
                                <SelectOption
                                    trigger='Select Category'
                                    selectLabel='Select Category'
                                    selectItems={Categories}
                                    className='py-6'
                                    onValueChange={(val) => {
                                        setSelectData({ ...selectData, category: val });
                                        setSelectDataErrors({ ...selectDataErrors, category: '' });
                                    }}
                                />
                                <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                    {selectDataErrors.category}
                                </span>
                            </div>
                            <div>
                                <SelectOption
                                    trigger='Select Brand'
                                    selectLabel='Select Brand'
                                    selectItems={Brands}
                                    className='py-6'
                                    onValueChange={(val) => {
                                        setSelectData({ ...selectData, brand: val });
                                        setSelectDataErrors({ ...selectDataErrors, brand: '' });
                                    }}
                                />
                                <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                    {selectDataErrors.brand}
                                </span>
                            </div>
                            <div>
                                <SelectOption
                                    trigger='Select Color'
                                    selectLabel='Select Color'
                                    selectItems={Colors}
                                    className='py-6'
                                    onValueChange={(val) => {
                                        setSelectData({ ...selectData, colors: [val] });
                                        setSelectDataErrors({ ...selectDataErrors, colors: '' });
                                    }}
                                />
                                <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                    {selectDataErrors.colors}
                                </span>
                            </div>
                        </div>
                        <div className='relative'>
                            <Input
                                id='file-choose'
                                type='file'
                                multiple
                                className='bg-gray-100 py-2 h-10 w-96 rounded-sm focus:outline-gray-500 border border-gray-600'
                                {...register('images', {
                                    required: { value: true, message: 'images is required' },
                                })}
                            />
                            <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                {errors.images?.message}
                            </span>
                        </div>
                        <div>
                            <Button
                                type='submit'
                                className='bg-green-700 hover:bg-green-800 inline-block mt-5'
                                onClick={handleSubmit(handleFormSubmit)}
                            >
                                {isLoading ? 'Creating..' : 'Add Product'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
