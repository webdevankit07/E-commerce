import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

const ImageSection = () => {
    const [selectedImage, setSelectImage] = useState<string>('/images/headphone.webp');

    return (
        <section className='flex items-center w-full'>
            <div className='px-3 flex flex-col gap-2 justify-center h-[500px]'>
                <ShortImage
                    imageUrl='/images/headphone.webp'
                    selectedImage={selectedImage}
                    setSelectImage={setSelectImage}
                />
                <ShortImage
                    imageUrl='/images/headphones.webp'
                    selectedImage={selectedImage}
                    setSelectImage={setSelectImage}
                />
                <ShortImage
                    imageUrl='/images/headphone.webp'
                    selectedImage={selectedImage}
                    setSelectImage={setSelectImage}
                />
            </div>
            <div>
                <Image src={selectedImage} width={400} height={500} alt='product-img' />
            </div>
        </section>
    );
};

interface ShortImageProps {
    selectedImage: string;
    setSelectImage: Dispatch<SetStateAction<string>>;
    imageUrl: string;
}

const ShortImage = ({ selectedImage, setSelectImage, imageUrl }: ShortImageProps) => {
    return (
        <div
            className={`border h-[80px] w-[80px] flex justify-center items-center p-2 cursor-pointer border-slate-500 hover:border-yellow-1 rounded ${
                selectedImage === imageUrl && 'border-yellow-1'
            }`}
            onClick={() => setSelectImage(imageUrl)}
        >
            <Image src={imageUrl} width={80} height={80} alt='product-img' />
        </div>
    );
};

export default ImageSection;
