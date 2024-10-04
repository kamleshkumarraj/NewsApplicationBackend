import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export const fileUploadOnCloudinary = async (filepath) => {
    try {
        const response = await cloudinary.uploader.upload(filepath)
        const res = await fs.unlinkSync(filepath)
        return response
    }catch(err){
       const res =  await fs.unlinkSync(filepath)
      
       return null
    }
}
