import { v2 as _cloudinary } from 'cloudinary';

const cloudinary = () => {
  const config = useRuntimeConfig()

  _cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiKey,
  });

  return _cloudinary
}

const cloudinarySign = () => {
  const config = useRuntimeConfig()

  const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
  const signature = cloudinary().utils.api_sign_request(
    { timestamp: timestamp },
    config.cloudinaryApiSecret
  );

  return {
    timestamp: timestamp,
    signature: signature,
    api_key: config.cloudinaryApiKey,
  }
}

export const uploadToCloudinary = (image: string): Promise<any> => {
  return new Promise((res, rej) => {
    cloudinary().uploader.upload(image, cloudinarySign(), (err: any, data: any) => {
      if (err) {
        rej(err)
      }
      res(data)
    })
  })
}
