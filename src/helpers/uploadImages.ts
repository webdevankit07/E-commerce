import { uploadOnCloudinary } from '@/utils/cloudinary';

export const uploadImages = async (images: File[], folder: string) => {
    const imagesUploading = images.map(async (file) => {
        const data = await uploadOnCloudinary(file, folder);
        return data;
    });
    const imageUrls = await Promise.all(imagesUploading);

    return imageUrls;
};
