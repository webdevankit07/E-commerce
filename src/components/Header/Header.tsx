import HeaderBottom from './HeaderBottom';
import HeaderMid from './HeaderMid';
import HeaderTop from './HeaderTop';

const Header = () => {
    return (
        <header className='bg-dark-1 text-white'>
            <HeaderTop />
            <HeaderMid />
            <HeaderBottom />
        </header>
    );
};

export default Header;
