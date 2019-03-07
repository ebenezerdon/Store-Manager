import cloudinary from 'cloudinary';

const uploadToCloudinary = async (imageFilePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  let response = '';
  await cloudinary.v2.uploader
    .upload(imageFilePath, (error, result) => {
      if (error) response = error;
      response = result.url;
    })
    .catch(error => error);

  return response;
};

export default uploadToCloudinary;
