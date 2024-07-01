'use client';
import BreadCrumb from '@/components/shared/Breadcrumb';
import { InputFile } from '@/components/shared/InputFile';
import SelectOption from '@/components/shared/Select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MouseEvent } from 'react';

const AddProduct = () => {
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleValueChange = (value: string) => {};

    return (
        <div className='pb-10'>
            <BreadCrumb BreadCrumbs={[{ name: 'Dashboard', location: '/admin/dashboard' }, { name: 'Add Product' }]} />
            <h3 className='font-medium text-[28px] mb-5'>Add Product</h3>
            <div>
                <form className='space-y-3'>
                    <Input
                        type='text'
                        name='title'
                        className='bg-gray-100 w-full py-6 rounded-sm focus:outline-gray-500 border border-gray-600'
                        placeholder='Product Title'
                        autoComplete='off'
                    />
                    <Textarea
                        name='description'
                        className='bg-gray-100 w-full py-5 rounded-sm focus:outline-gray-500 border border-gray-600 resize-none'
                        placeholder='Description'
                        autoComplete='off'
                        rows={5}
                    />
                    <div className='flex gap-4'>
                        <Input
                            type='number'
                            name='price'
                            className='bg-gray-100 w-full py-6 rounded-sm focus:outline-gray-500 border border-gray-600'
                            placeholder='Product Price'
                            autoComplete='off'
                        />
                        <Input
                            type='number'
                            name='quantity'
                            className='bg-gray-100 w-full py-6 rounded-sm focus:outline-gray-500 border border-gray-600'
                            placeholder='Product Quantity'
                            autoComplete='off'
                        />
                    </div>
                    <div className='flex gap-4'>
                        <SelectOption
                            trigger='Select Category'
                            selectItems={['smartphones', 'tv', 'watch']}
                            onValueChange={handleValueChange}
                            className='py-6'
                        />
                        <SelectOption
                            trigger='Select Brand'
                            selectItems={['apple', 'MI', 'redmi', 'samsung']}
                            onValueChange={handleValueChange}
                            className='py-6'
                        />
                        <SelectOption
                            trigger='Select Color'
                            selectItems={['red', 'orange', 'yellow', 'dark']}
                            onValueChange={handleValueChange}
                            className='py-6'
                        />
                    </div>
                    <div className='w-full'>
                        <InputFile />
                    </div>
                    <div>
                        <Button
                            type='submit'
                            className='bg-green-700 hover:bg-green-800 inline-block mt-5'
                            onClick={handleSubmit}
                        >
                            Add Product
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
