import Categories from '@/components/Home/Categories';
import Hero from '@/components/Home/Hero';
import MarqueeSection from '@/components/Home/MarqueeSection';
import Services from '@/components/Home/Services';

const Home = () => {
    return (
        <main>
            <Hero />
            <Services />
            <Categories />
            <MarqueeSection />
        </main>
    );
};

export default Home;
