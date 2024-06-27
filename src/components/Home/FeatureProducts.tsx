import Container from '../shared/Container';
import ProductCard from './ProductCard';

const FeatureProducts = () => {
    return (
        <section className='py-5 pb-10 bg-slate-100'>
            <Container>
                <h3 className='font-semibold mb-4 text-lg'>Featured Collection</h3>
                <div className='grid gap-5 grid-cols-6'>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </Container>
        </section>
    );
};

export default FeatureProducts;
