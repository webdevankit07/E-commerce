import { ImageType } from '@/models/product.model';
import { uploadOnCloudinary } from '@/services/cloudinary/cloudinary';

export const uploadImages = async (images: File[], folder: string) => {
    const imagesUploading = images.map(async (file) => {
        const data = await uploadOnCloudinary(file, folder);
        return data as ImageType;
    });
    const imageUrls = await Promise.all(imagesUploading);

    return imageUrls;
};
