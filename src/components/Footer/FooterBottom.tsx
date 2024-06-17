import Container from '../shared/Container';

const FooterBottom = () => {
    return (
        <Container className='border-t border-dark-2 py-4'>
            <p className='text-center'>&copy; {new Date().getFullYear()}, Copyrighted by ShopWave.</p>
        </Container>
    );
};

export default FooterBottom;
