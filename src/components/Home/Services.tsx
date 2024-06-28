import Container from '@/components/shared/Container';
import { services } from '@/lib/data';

const Services = () => {
    return (
        <section className='bg-slate-100 pt-10 pb-5'>
            <Container>
                <div className='flex justify-between items-center'>
                    {services.map((service, index) => (
                        <div className='flex gap-3 items-center' key={index}>
                            <service.Icon className='text-4xl' />
                            <div>
                                <h6 className='font-semibold text-sm'>{service.title}</h6>
                                <p className='text-gray-800 text-xs'>{service.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Services;
