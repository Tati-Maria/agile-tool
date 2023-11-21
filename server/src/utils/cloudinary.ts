/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from 'dotenv';
config();
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const opts: UploadApiOptions = {
  resource_type: 'auto',
  folder: 'worktec/avatars',
  invalidate: true,
  overwrite: true,
  use_filename: true,
};

const uploadAvatar = (image: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (err, result) => {
      if (result && result.secure_url) {
        console.log('Uploaded avatar to Cloudinary');
        return resolve(result);
      } else {
        console.log('Error uploading avatar to Cloudinary');
        return reject(err);
      }
    });
  });
};

const deleteAvatar = (public_id: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (err, result) => {
      if (result && result.result === 'ok') {
        console.log('Deleted avatar from Cloudinary');
        return resolve(result);
      } else {
        console.log('Error deleting avatar from Cloudinary');
        return reject(err);
      }
    });
  });
};

const optsLogo: UploadApiOptions = {
  resource_type: 'auto',
  folder: 'worktec/logos',
  invalidate: true,
  overwrite: true,
  use_filename: true,
};

const uploadLogo = (image: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, optsLogo, (err, result) => {
      if (result && result.secure_url) {
        console.log('Uploaded logo to Cloudinary', result.secure_url);
        return resolve(result);
      } else {
        console.log('Error uploading logo to Cloudinary');
        return reject(err);
      }
    });
  });
};

const deleteLogo = (public_id: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (err, result) => {
      if (result && result.result === 'ok') {
        console.log('Deleted logo from Cloudinary');
        return resolve(result);
      } else {
        console.log('Error deleting logo from Cloudinary');
        return reject(err);
      }
    });
  });
};


export { uploadAvatar, uploadLogo, deleteLogo, deleteAvatar };
