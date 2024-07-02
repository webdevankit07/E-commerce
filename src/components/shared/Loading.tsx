import { Oval } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='w-full h-screen grid place-content-center'>
            <div>
                <Oval
                    visible={true}
                    height='80'
                    width='80'
                    color='#6f6c6c'
                    secondaryColor='#858585'
                    ariaLabel='oval-loading'
                    strokeWidth={3}
                />
                <div className='text-center font-medium text-xl text-gray-600 mt-5'>Loading...</div>
            </div>
        </div>
    );
};

export default Loading;
