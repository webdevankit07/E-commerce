import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (file: File, folder: string) => {
    if (!file) return null;
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
        await cloudinary.uploader
            .upload_stream(
                {
                    resource_type: 'auto',
                    folder: folder,
                },
                (err: any, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            )
            .end(bytes);
    });
};

export const deleteFromCloudinary = async (publicId: string) => {
    try {
        const res = await cloudinary.uploader.destroy(publicId);
        return res;
    } catch (error: any) {
        throw new Error(error);
    }
};
