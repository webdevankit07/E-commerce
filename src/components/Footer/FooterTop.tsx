import Container from '../shared/Container';
import { FiSend } from 'react-icons/fi';

const FooterTop = () => {
    return (
        <Container className='py-10 border-b border-dark-2'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-5'>
                    <FiSend className='text-3xl' /> <span className='text-3xl'>Sign Up For Newsletter</span>
                </div>
                <div className='bg-white rounded-md overflow-hidden p-1'>
                    <input
                        type='text'
                        className='py-1 px-2 focus:outline-none text-black w-[500px]'
                        placeholder='Your email address'
                    />
                    <button className='bg-dark-1 py-2 px-5 rounded'>Subscribe</button>
                </div>
            </div>
        </Container>
    );
};

export default FooterTop;
