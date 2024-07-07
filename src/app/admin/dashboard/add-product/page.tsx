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
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { getAllColors } from '@/redux/features/color/colorSlice';
import { getAllCategories } from '@/redux/features/categories/categorySlice';
import { getAllBrands } from '@/redux/features/brand/brandSlice';
import Loading from '@/components/shared/Loading';

export interface SelectDataType {
    category: string;
    brand: string;
    colors: string[];
}

const AddProduct = () => {
    const { isLoading, isError } = useAppSelector((state) => state.product);
    const { categories } = useAppSelector((state) => state.category);
    const { brands } = useAppSelector((state) => state.brand);
    const { colors } = useAppSelector((state) => state.color);
    const [selectData, setSelectData] = useState<SelectDataType>({ category: '', brand: '', colors: [] });
    const [selectDataErrors, setSelectDataErrors] = useState({ category: '', brand: '', colors: '' });
    // const [imageUrls, setImageUrls] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const Categories = categories.map((category) => category.title);
    const Brands = brands.map((brand) => brand.name);
    const options = colors.map((color) => ({ value: color.name, label: color.name }));

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
    } = useForm<CreateProductData>();

    useEffect(() => {
        !categories.length && dispatch(getAllCategories());
        !brands.length && dispatch(getAllBrands());
        !colors.length && dispatch(getAllColors());
    }, [categories.length, brands.length, colors.length, dispatch]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    // const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    //     const target = e.target as HTMLInputElement;
    //     if (!target.files) return;
    //     for (let i = 0; i < target.files.length; i++) {
    //         const file: File = (target.files as FileList)[i];
    //         if (file) {
    //             const tempUrl = URL.createObjectURL(file);
    //             if (!imageUrls) {
    //                 console.log({ state: 'in', imageUrls });
    //                 setImageUrls([tempUrl]);
    //             } else {
    //                 console.log({ state: 'out', imageUrls });
    //                 setImageUrls([...imageUrls, tempUrl]);
    //             }
    //         }
    //     }
    // };

    const handleFormSubmit: SubmitHandler<CreateProductData> = async (formData) => {
        const { productInfo, imageFiles, error } = validateFormData(formData, selectData, setSelectDataErrors);
        if (error) return setSelectDataErrors(error);
        await dispatch(createProduct({ productInfo, imageFiles }));
        if (!isError) {
            router.push('/admin/dashboard/product-list');
        }
    };

    return (
        <div className='pb-10'>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Add Product' }]} />
            {!categories.length || !brands.length || !colors.length ? (
                <Loading />
            ) : (
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
                                    <Select
                                        mode='multiple'
                                        value={selectData.colors}
                                        defaultValue={selectData.colors}
                                        style={{
                                            width: '100%',
                                            height: '50px',
                                            border: '1px solid black',
                                            borderRadius: '5px',
                                        }}
                                        onChange={(val) => {
                                            setSelectData({ ...selectData, colors: val });
                                            setSelectDataErrors({ ...selectDataErrors, colors: '' });
                                        }}
                                        suffixIcon={<DownOutlined />}
                                        placeholder='Select Colors'
                                        options={options}
                                        className='focus:outline-none hover:outline-none block'
                                    />
                                    <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                        {selectDataErrors.colors}
                                    </span>
                                </div>
                            </div>
                            <div className='relative flex items-center gap-20 h-[100px]'>
                                <div>
                                    <Input
                                        id='file-choose'
                                        type='file'
                                        multiple
                                        className='bg-gray-100 py-2 h-10 w-96 rounded-sm focus:outline-gray-500 border border-gray-600'
                                        {...register('images', {
                                            required: { value: true, message: 'images is required' },
                                        })}
                                        // onChange={handleImageChange}
                                    />
                                    <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                        {errors.images?.message}
                                    </span>
                                </div>
                                {/* <div className='flex gap-5'>
                                {imageUrls &&
                                    imageUrls.map((imageUrl, index) => (
                                        <div
                                            className='relative hover:scale-110 transition-all duration-300'
                                            key={index}
                                        >
                                            <Image
                                                width={80}
                                                height={80}
                                                src={imageUrl}
                                                alt='product-img'
                                                className='border-[1.5px] border-slate-500 rounded hover:shadow  transition-all duration-300 p-1'
                                            />
                                        </div>
                                    ))}
                            </div> */}
                            </div>
                            <Button
                                type='submit'
                                className='bg-green-700 text-center hover:bg-green-800 mt-5 min-w-[100px]'
                                onClick={handleSubmit(handleFormSubmit)}
                            >
                                {isLoading ? (
                                    <Oval
                                        visible={true}
                                        width={20}
                                        height={20}
                                        color='#ececec'
                                        secondaryColor='#c4c4c4'
                                        ariaLabel='oval-loading'
                                        strokeWidth={3}
                                    />
                                ) : (
                                    'Add Product'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
