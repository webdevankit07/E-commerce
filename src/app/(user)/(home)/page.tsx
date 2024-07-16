import Categories from '@/components/Home/Categories';
import FeatureProducts from '@/components/Home/FeatureProducts';
import Hero from '@/components/Home/Hero';
import MarqueeSection from '@/components/Home/MarqueeSection';
import PopularProducts from '@/components/Home/PopularProducts';
import Services from '@/components/Home/Services';
import SpecialProducts from '@/components/Home/SpecialProducts';

const Home = () => {
    return (
        <main>
            <Hero />
            <Categories />
            <Services />
            <PopularProducts />
            <FeatureProducts />
            <SpecialProducts />
            <MarqueeSection />
        </main>
    );
};

export default Home;
