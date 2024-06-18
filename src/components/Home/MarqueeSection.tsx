import Image from 'next/image';
import Container from '../shared/Container';
import Marquee from 'react-fast-marquee';

const MarqueeSection = () => {
    return (
        <Container className='py-5'>
            <Marquee>
                <div className='flex gap-16 items-center'>
                    <MarqueeImg url='apple.png' alt='apple-logo' />
                    <MarqueeImg url='canon.png' alt='canon-logo' />
                    <MarqueeImg url='intel.png' alt='intel-logo' />
                    <MarqueeImg url='lg.png' alt='lg-logo' />
                    <MarqueeImg url='sanddisk.png' alt='sanddisk-logo' />
                    <MarqueeImg url='sony.png' alt='sony-logo' />
                </div>
            </Marquee>
        </Container>
    );
};

const MarqueeImg = ({ url, alt }: { url: string; alt: string }) => {
    return (
        <div className='min-w-[160px] h-[70px] relative'>
            <Image src={`/images/brand/${url}`} fill objectFit='contain' alt={alt} />
        </div>
    );
};

export default MarqueeSection;
