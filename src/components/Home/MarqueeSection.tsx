import Image from 'next/image';
import Container from '../shared/Container';
import Marquee from 'react-fast-marquee';

const MarqueeSection = () => {
    return (
        <section>
            <Container className='py-5'>
                <Marquee>
                    <div className='flex gap-5 md:gap-16 items-center'>
                        <MarqueeImg url='apple.png' alt='apple-logo' />
                        <MarqueeImg url='canon.png' alt='canon-logo' />
                        <MarqueeImg url='intel.png' alt='intel-logo' />
                        <MarqueeImg url='lg.png' alt='lg-logo' />
                        <MarqueeImg url='sanddisk.png' alt='sanddisk-logo' />
                        <MarqueeImg url='sony.png' alt='sony-logo' />
                    </div>
                </Marquee>
            </Container>
        </section>
    );
};

const MarqueeImg = ({ url, alt }: { url: string; alt: string }) => {
    return (
        <div className='min-w-[100px] h-[40px] md:min-w-[160px] md:h-[70px] relative cursor-pointer'>
            <Image src={`/images/brand/${url}`} fill sizes='100%' style={{ objectFit: 'contain' }} alt={alt} />
        </div>
    );
};

export default MarqueeSection;
