const DescriprionSection = ({ description }: { description: string }) => {
    return (
        <section className='mt-5 mb-10'>
            <h2 className='font-semibold mb-2'>Decription</h2>
            <p className='py-5 px-5 bg-white rounded text-sm text-slate-600'>{description}</p>
        </section>
    );
};

export default DescriprionSection;
