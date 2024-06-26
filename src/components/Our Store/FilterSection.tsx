const FilterSection = () => {
    return (
        <section>
            <div className='bg-white rounded-md py-3 px-4'>
                <h3 className='font-semibold text-slate-900 mb-4'>Filter By</h3>
                <div className='my-4'>
                    <h5 className='font-semibold text-slate-700 text-sm mb-1.5  '>Availablity</h5>
                    <div>
                        <div className='flex gap-3 text-sm my-1 cursor-pointer'>
                            <input type='checkbox' name='inStock' id='instock' className='accent-yellow-1' />
                            <label htmlFor='instock' className='cursor-pointer'>
                                In Stock (12)
                            </label>
                        </div>
                        <div className='flex gap-3 text-sm cursor-pointer'>
                            <input type='checkbox' name='outofStock' id='outofstock' className='accent-yellow-1' />
                            <label htmlFor='outofstock' className='cursor-pointer'>
                                Out of Stock (0)
                            </label>
                        </div>
                    </div>
                </div>
                <div className='my-4'>
                    <h5 className='font-semibold text-slate-700 text-sm mb-1.5'>Price (&#8377;)</h5>
                    <div className='flex items-center gap-5'>
                        <input
                            type='number'
                            id='from'
                            className='border border-dark-1/[.5] rounded py-2 px-2 text-sm focus:outline-none w-[100px] bg-slate-100'
                            placeholder='From'
                        />
                        <input
                            type='number'
                            id='from'
                            className='border border-dark-1/[.5] rounded py-2 px-2 text-sm focus:outline-none w-[100px] bg-slate-100'
                            placeholder='To'
                        />
                    </div>
                </div>
                <div className='my-4'>
                    <h5 className='font-semibold text-slate-700 text-sm mb-1.5'>Colors</h5>
                    <div>
                        <ul className='*:w-5 *:h-5 *:bg-red-500 *:rounded-full flex items-center flex-wrap gap-2.5'>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <div className='mb-3'>
                    <h5 className='font-semibold text-slate-700 text-sm mb-1.5'>Sizes</h5>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-3 text-sm cursor-pointer'>
                            <input type='checkbox' name='outofStock' id='size_s' className='accent-yellow-1' />
                            <label htmlFor='size_s' className='cursor-pointer'>
                                S (2)
                            </label>
                        </div>
                        <div className='flex gap-3 text-sm cursor-pointer'>
                            <input type='checkbox' name='outofStock' id='size_m' className='accent-yellow-1' />
                            <label htmlFor='size_m' className='cursor-pointer'>
                                M (2)
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterSection;
