'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import Loading from '@/components/shared/Loading';
import SelectOption from '@/components/shared/Select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { handleAxiosError } from '@/config/axios';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { validateFormData } from '@/lib/utils';
import { createProduct, updateProduct } from '@/redux/features/product/productSlice';
import { getProduct } from '@/services/products';
import { CreateProductData, ProductType, UpdateProductData, UpdateProductInfo } from '@/types';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import { useRouter } from 'next/navigation';

const UpdateProduct = ({ params }: { params: { id: string } }) => {
    const { isLoading } = useAppSelector((state) => state.product);
    const { categories } = useAppSelector((state) => state.category);
    const { brands } = useAppSelector((state) => state.brand);
    const { colors } = useAppSelector((state) => state.color);
    const [selectData, setSelectData] = useState({ category: '', brand: '', colors: [''] });
    const [selectDataErrors, setSelectDataErrors] = useState({ category: '', brand: '', colors: '' });
    const [product, setProduct] = useState<ProductType>();
    const [IsLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const Categories = categories.map((category) => category.title);
    const Brands = brands.map((brand) => brand.name);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const product = await getProduct(params.id);
                setProduct(product);
                setSelectData({
                    category: product.category,
                    brand: product.brand,
                    colors: product.colors,
                });
                setIsLoading(false);
            } catch (error) {
                const err = await handleAxiosError(error);
                toast.error(err);
                setIsLoading(false);
            }
        })();
    }, [params.id]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProductData>();

    if (IsLoading || !product || !colors) {
        return <Loading />;
    } else {
        const options = colors.map((color) => ({ value: color.name, label: color.name }));

        const handleImageClick = (publicId: string) => {
            const images = product.images;
            const filterImages = images.filter((image) => image.public_id !== publicId);
            setProduct({ ...product, images: filterImages });
        };

        const handleFormSubmit: SubmitHandler<UpdateProductData> = async (formData) => {
            const { productInfo, imageFiles, error } = validateFormData(formData, selectData, setSelectDataErrors);
            if (error) return setSelectDataErrors(error);

            const ProductInfo = { ...productInfo, _id: product._id, images: product.images };

            try {
                await dispatch(updateProduct({ ProductInfo, imageFiles }));
                router.push('/admin/dashboard/product-list');
            } catch (error) {
                const err = await handleAxiosError(error);
                console.log(err);
            }
        };

        return (
            <div className='pb-10'>
                <BreadCrumb
                    BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Update Product' }]}
                />
                <div className='bg-white px-10 py-10 rounded-md shadow-md'>
                    <h3 className='font-medium text-[28px] mb-5'>Update Product</h3>
                    <div>
                        <form className='space-y-8'>
                            <div className='relative'>
                                <Input
                                    type='text'
                                    className='bg-gray-100 w-full py-6 rounded-sm focus:outline-gray-500 border border-gray-600'
                                    placeholder='Product Title'
                                    autoComplete='off'
                                    defaultValue={product.title}
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
                                    defaultValue={product.description}
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
                                        defaultValue={product.price}
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
                                        defaultValue={product.quantity}
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
                                        defaultValue={product.category}
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
                                        defaultValue={product.brand}
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
                                        className='focus:outline-none hover:outline-none'
                                    />
                                    <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                        {selectDataErrors.colors}
                                    </span>
                                </div>
                            </div>
                            <div className='relative items-center flex gap-20 h-[100px]'>
                                <div>
                                    <Input
                                        id='file-choose'
                                        type='file'
                                        multiple
                                        className='bg-gray-100 py-2 h-10 w-96 rounded-sm focus:outline-gray-500 border border-gray-600'
                                        {...register('images', {
                                            required: { value: false, message: 'images is required' },
                                        })}
                                    />
                                    <span className='absolute font-semibold text-xs ml-1 text-red-500'>
                                        {errors.images?.message}
                                    </span>
                                </div>
                                <div className='flex gap-5'>
                                    {product.images.map((image) => (
                                        <div
                                            className='relative hover:scale-110 transition-all duration-300'
                                            key={image.public_id}
                                        >
                                            <Image
                                                width={80}
                                                height={80}
                                                src={image.optimizeUrl}
                                                alt='product-img'
                                                className='border-[1.5px] border-slate-500 rounded hover:shadow  transition-all duration-300'
                                            />
                                            <Button
                                                className='absolute -right-1 -top-1 bg-red-500 h-6 w-6 rounded-full grid place-content-center text-white p-2'
                                                onClick={() => handleImageClick(image.public_id)}
                                            >
                                                <RxCross2 />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
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
                                    'Update'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default UpdateProduct;
