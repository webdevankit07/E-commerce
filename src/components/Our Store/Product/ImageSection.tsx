import { ImageType } from '@/types';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const ImageSection = ({ images }: { images: ImageType[] }) => {
    const [selectedImage, setSelectImage] = useState<string>('');

    useEffect(() => {
        setSelectImage(images[0].url);
    }, [images]);

    return (
        <section className='flex max-[540px]:flex-col items-center gap-5 sm:min-w-[500px]'>
            <div className='px-3 flex max-[540px]:flex-row flex-col gap-2 justify-center sm:h-[500px]'>
                {images.map((image) => (
                    <ShortImage
                        imageUrl={image.url}
                        selectedImage={selectedImage}
                        setSelectImage={setSelectImage}
                        key={image.public_id}
                    />
                ))}
            </div>
            <div>
                <Image
                    src={selectedImage}
                    width={500}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                    alt='product-img'
                />
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
            className={`border max-[540px]:h-[60px] max-[540px]:w-[60px] h-[80px] w-[80px] flex flex-wrap justify-center items-center p-2 cursor-pointer border-slate-500 hover:border-yellow-1 rounded ${
                selectedImage === imageUrl && 'border-yellow-1'
            }`}
            onClick={() => setSelectImage(imageUrl)}
        >
            <Image src={imageUrl} width={80} height={80} alt='product-img' />
        </div>
    );
};

export default ImageSection;
