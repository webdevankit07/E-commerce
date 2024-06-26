import { cloudAPIKey, cloudAPISecret, cloudName } from '@/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudAPIKey,
    api_secret: cloudAPISecret,
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
                    folder: `e-commerce/${folder}`,
                },
                (err: any, result) => {
                    if (err) {
                        reject(err);
                    }

                    if (result) {
                        const optimizeUrl = cloudinary.url(result.public_id, {
                            fetch_format: 'auto',
                            quality: 'auto',
                            width: 300,
                            height: 300,
                        });
                        resolve({
                            public_id: result.public_id,
                            url: result.url,
                            optimizeUrl,
                        });
                    }
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
