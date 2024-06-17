import FooterBottom from './FooterBottom';
import FooterMid from './FooterMid';
import FooterTop from './FooterTop';

const Footer = () => {
    return (
        <div className='bg-dark-1 text-white'>
            <FooterTop />
            <FooterMid />
            <FooterBottom />
        </div>
    );
};

export default Footer;
