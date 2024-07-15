import Container from '../shared/Container';
import ListHeading from './ListHeading';
import ListItems from './ListItems';
import Image from 'next/image';
import Socialicon from './Socialicon';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const FooterMid = () => {
    return (
        <div>
            <Container className='py-10 px-[40px]'>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10'>
                    <div>
                        <ListHeading>Contact Us</ListHeading>
                        <address className='space-y-1 text-gray-400'>
                            <p>Hno : 244 Near Gopal Maidan</p>
                            <p>yavat, Pune</p>
                            <p>Pincode : 412214</p>
                            <a className='block py-2 hover:underline' href='tel:+919304661037'>
                                +91 9304661037
                            </a>
                            <a className='block hover:underline' href='mailto:ankityadav.webdev@gmail.com'>
                                ankityadav.webdev@gmail.com
                            </a>
                            <div className='flex gap-3 py-3'>
                                <Socialicon icon={FaLinkedin} url='https://www.linkedin.com/in/webdevankit/' />
                                <Socialicon icon={FaFacebook} url='https://www.linkedin.com/in/webdevankit/' />
                                <Socialicon icon={FaGithub} url='https://github.com/webdevankit07' />
                                <Socialicon icon={FaYoutube} url='https://youtube.com/factoriousworld' />
                                <Socialicon icon={FaTwitter} url='https://github.com/webdevankit07' />
                            </div>
                        </address>
                    </div>
                    <div>
                        <ListHeading>Quick Links</ListHeading>
                        <ListItems name='Accessories' url='#' />
                        <ListItems name='Laptop' url='#' />
                        <ListItems name='Headphones' url='#' />
                        <ListItems name='Tablets' url='#' />
                        <ListItems name='Watch' url='#' />
                    </div>
                    <div>
                        <ListHeading>Account</ListHeading>
                        <ListItems name='Search' url='#' />
                        <ListItems name='About Us' url='#' />
                        <ListItems name='Faq' url='#' />
                        <ListItems name='Contact' url='#' />
                        <ListItems name='Size Chart' url='#' />
                    </div>
                    <div>
                        <ListHeading>Information</ListHeading>
                        <ListItems name='Privacy Policy' url='#' />
                        <ListItems name='Refund Policy' url='#' />
                        <ListItems name='Shoping Policy' url='#' />
                        <ListItems name='Terms & Conditions' url='#' />
                        <ListItems name='Blogs' url='#' />
                    </div>
                    <div>
                        <ListHeading>Our App</ListHeading>
                        <div className='space-y-2'>
                            <p className='text-sm text-gray-300'>
                                Download our App and get extra 15% Discount on your first order..!
                            </p>
                            <div className='flex gap-2'>
                                <div>
                                    <Image
                                        src={'/PlayStore logo.png'}
                                        alt='playstore-logo'
                                        width={112}
                                        height={32}
                                        style={{ width: 'auto', height: 'auto' }}
                                        className='cursor-pointer'
                                    />
                                </div>
                                <Image
                                    src={'/AppStore logo.png'}
                                    alt='playstore-logo'
                                    width={112}
                                    height={32}
                                    style={{ width: 'auto', height: 'auto' }}
                                    className='cursor-pointer'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default FooterMid;
